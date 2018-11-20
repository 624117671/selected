<template>
    <div id="test">
    <select v-model="provincesId">
        <option v-for="item in provinces" :value="item.civilregionalismid" :key='item.civilregionalismid'>{{item.civilregionalismname}}</option>
    </select>
    <template v-if='!onlyProvince'>
      <select v-model="citysId">
          <option v-for="item in citys" :value="item.CIVILREGIONALISMID" :key='item.CIVILREGIONALISMID'>{{item.CIVILREGIONALISMNAME}}</option>
      </select>
      <select v-if='!hideArea' v-model="areasId">
          <option v-for="item in areas" :value="item.CIVILREGIONALISMID" :key='item.CIVILREGIONALISMID'>{{item.CIVILREGIONALISMNAME}}</option>
      </select>
    </template>
</div>
</template>
<script>
import axios from 'axios'
var start = true;
export default {
    data(){
        return{
            provinces:[{civilregionalismname:'--省--',civilregionalismid:'0'}],
            citys:[{CIVILREGIONALISMNAME:'--市--',CIVILREGIONALISMID:'0'}],
            areas:[{CIVILREGIONALISMNAME:'--县--',CIVILREGIONALISMID:'0'}],
            provincesId:'0',
            citysId:'0',
            areasId:'0',
            provincesCheck:{
                id:'',
                code:'',
                name:''
            },
            citysCheck:{
                id:'',
                code:'',
                name:''
            },
            areasCheck:{
                id:'',
                code:'',
                name:''
            },
            selected:{
                provincesCheck:this.provincesCheck,
                citysCheck:this.citysCheck,
                areasCheck:this.areasCheck
            },
            municipalities:['北京','天津','重庆','宁夏','兵团'],
            municipalitiesId:['110000','120000','500000','640000']
        }
        
    },
    props:{
      province: { type: [String, Number], default: '' },//默认省
      city: { type: [String, Number], default: '' },//默认市
      area: { type: [String, Number], default: '' },//默认县
      hideArea: { type: Boolean, default: false },//隐藏县
      onlyProvince: { type: Boolean, default: false },//只显示省
      provinceUrl:{type:[String],default:''},//省的数据接口地址
      cityUrl:{type:[String],default:''},//市的数据接口地址
      areaUrl:{type:[String],default:''},//县的数据接口地址
    },
    methods:{
      async getprovince(){
        let $this = this
        let p = new Promise(function(resolve, reject){
            
            axios.get($this.provinceUrl||'src/assets/static/province.json')
            .then(function(rs){
                $this.provinces = [{civilregionalismname:'--省--',civilregionalismid:'0'},...(rs.data.data||rs.data)];
                if($this.province){
                    $this.provincesId = $this.province;
                }
                resolve();
            })
            .catch(function (error) {
                console.log(error);
            });
        })
        
        return p;
        
      },
      async getCity(){
        let $this = this;
        let bool = true;
        let zName = '直辖市';
        let c = new Promise(function(resolve, reject){
            if(!$this.provincesId || $this.provincesId == '1' || $this.provincesId == '0'){
                $this.citys = [
                        {
                            CIVILREGIONALISMNAME:'--市--',
                            CIVILREGIONALISMID:'0'
                        }];
                $this.citysId = '0';
                return;
            }
            
            $this.municipalities.forEach(item => {
                if($this.provincesCheck.name.indexOf(item) > -1){
                    if(item == '兵团'){
                    zName = '兵团本级'; 
                    }
                    $this.citys = [
                        {
                            CIVILREGIONALISMNAME:'--市--',
                            CIVILREGIONALISMID:'0'
                        },
                        {
                            CIVILREGIONALISMNAME:zName,
                            CIVILREGIONALISMID:$this.provincesCheck.id,
                            CIVILREGIONALISMCODE:$this.provincesCheck.code
                        }];
                        bool = false;
                        return false;
                }
            });
            if(!bool){
                return;
            }
            axios.get(($this.cityUrl||'src/assets/static/city.json')+'?civilregionalismCode='+$this.provincesCheck.code)
            .then(function(rs){
                console.log(start,$this.city)
                if(start && $this.city){
                    $this.citysId = $this.city;
                    if(!$this.area){
                        start = false;
                    }
                }
                if($this.cityUrl){
                    $this.citys = [{CIVILREGIONALISMNAME:'--市--',CIVILREGIONALISMID:'0'},...rs.data.citylist];
                }
                else{
                    if($this.provincesCheck.code){
                        $this.citys = [{CIVILREGIONALISMNAME:'--市--',CIVILREGIONALISMID:'0'}];
                        rs.data.forEach(item => {
                            if(item.CIVILREGIONALISMID.substring(0,2) == $this.provincesCheck.code.substring(0,2)){
                                $this.citys.push(item)
                            }
                            
                        })
                    }
                    
                }
                resolve()
            })
            .catch(function (error) {
                console.log(error);
            });
        });
        return c;
        
      },
      async getArea(){
          let $this = this;
          if($this.hideArea||$this.onlyProvince){
              return;
          }
          if(!$this.citysId || $this.citysId == '1' || $this.citysId == '0'){
              $this.areas = [
                    {
                        CIVILREGIONALISMNAME:'--县--',
                        CIVILREGIONALISMID:'0'
                    }];
                $this.areasId = '0';
            return;
          }
          axios.get((this.areaUrl||'src/assets/static/area.json')+'?civilregionalismCode='+$this.citysCheck.code)
          .then(function(rs){
              if(start && $this.area){
                  $this.areasId = $this.area;
                  start = false;
              }
              let b = $this.municipalitiesId.indexOf($this.provincesCheck.id);
              if($this.areaUrl){
                  $this.areas = [{CIVILREGIONALISMNAME:'--县--',CIVILREGIONALISMID:'0'},...rs.data.citylist];
              }
              else{
                  $this.areas = [{CIVILREGIONALISMNAME:'--县--',CIVILREGIONALISMID:'0'}];
                  rs.data.forEach(item => {
                      if(b > -1){
                          
                          if(item.CIVILREGIONALISMID.substring(0,4) == $this.citysCheck.code.substring(0,3)+'1'){

                                $this.areas.push(item)
                            }
                      }
                      else{
                          if(item.CIVILREGIONALISMID.substring(0,4) == $this.citysCheck.code.substring(0,4)){
                                $this.areas.push(item)
                            }
                      }
                      
                  })
              }
          })
      },
      getSelected(){
          this.selected.provincesCheck=this.provincesCheck;
          this.selected.citysCheck=this.citysCheck;
          this.selected.areasCheck=this.areasCheck;
          this.$emit('selected',this.selected);
      }
    },
    created:function () {
        this.getprovince();
    },
    watch:{
        provincesId:function (val,oldVal) {
           let $this = this;
           this.provinces.forEach(item => {
               if(item.civilregionalismid == val){
                   $this.provincesCheck.name = item.civilregionalismname;
                   $this.provincesCheck.id = item.civilregionalismid;
                   $this.provincesCheck.code = item.civilregionalismcode;
               }
           });
           $this.citysId = '0';
           $this.getSelected()
            $this.getCity();
            console.log($this.citysId)
           
        },
        citysId:function (val) {
           let $this = this;
               $this.citys.forEach(item => {
                    if(item.CIVILREGIONALISMID == val){
                        $this.citysCheck.name = item.CIVILREGIONALISMNAME;
                        $this.citysCheck.id = item.CIVILREGIONALISMID;
                        $this.citysCheck.code = item.CIVILREGIONALISMCODE;
                    }
                });
               
            $this.areasId = '0';
            $this.getSelected()
            $this.getArea();
        },
        areasId:function (val) {
            let $this = this;
           this.areas.forEach(item => {
               if(item.CIVILREGIONALISMID == val){
                   $this.areasCheck.name = item.CIVILREGIONALISMNAME;
                   $this.areasCheck.id = item.CIVILREGIONALISMID;
                   $this.areasCheck.code = item.CIVILREGIONALISMCODE;
               }
           });
           $this.getSelected()
        },
    }
}
</script>

<style scoped>
select {
    padding: .5rem .75rem;
    height: 40px;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    
  }
  option {
      font-weight: normal;
      display: block;
      white-space: pre;
      min-height: 1.2em;
      padding: 0px 2px 1px;
    }
.distpicker-address-wrapper {
  color: #9caebf;
  
}
</style>
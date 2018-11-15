<template>
<div>
<selectarea :provinceUrl="url.province" @selected="selecteds" :cityUrl="url.city" :areaUrl="url.area" />
</div>
</template>
<script>
  import selectarea from './area'
  
export default {
    data(){
        return{
          url:{
            province:'http://202.108.98.3/JmProject_Left-Behind_Children/Children/getCountByCivil?civilregionalismcode=111111',
            city:'http://202.108.98.3/JmProject_Left-Behind_Children/Civilregionalism/getCity',
            area:'http://202.108.98.3/JmProject_Left-Behind_Children/Civilregionalism/getCountry'
          },
          province:"113938e7ef1b4c6089d098afb721edf3",
          city:"c45e3feeacbc4d0a8f2a49d012edc813",
          area:"90cfcf0958d24ecdaad774299378b3f1",
          selected:[]
        }
        
    },
    components: {
      selectarea
    },
   

    created:function () {
       
    },
    methods:{
      selecteds(data){
        console.log(data);
        this.selected = data;
      }
    },
    watch:{
    
    }
}
</script>
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
            province:'',
            city:'',
            area:''
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

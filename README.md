# fineway liguodong

>

## Install

npm install vue-city-bspicker --save

## API
```XML

<selectarea :provinceUrl="url.province" @selected="selecteds" :cityUrl="url.city" :areaUrl="url.area"/>


```

```JavaScript

import selectarea from 'vue-selected'
export default {
    data(){
        return{
          url:{
            province:'',//省接口地址
            city:'',//市接口地址
            area:''//县接口地址
          },
          province:"",//默认省接口id
          city:"",//默认市接口id
          area:"",//默认县接口id
          selected:[]
        }
        
    },
    components: {
      selectarea
    },
    methods:{
      selecteds(data){
        console.log(data);//选中的数据
        this.selected = data;
      }
    }
}
```


# fineway liguodong

>

## 区划数据来源

[民政部门户网站](http://www.mca.gov.cn/article/sj/xzqh/2018/201804-12/20180910291042.html)

##Install
npm install vue-selected --save

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
          province:"",//默认省id
          city:"",//默认市id
          area:"",//默认县id
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


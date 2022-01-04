<template>
  <mavon-editor   v-model="content" :subfield="prop.subfield" :defaultOpen="prop.defaultOpen" :toolbarsFlag="prop.toolbarsFlag" :editable="prop.editable" :scrollStyle="prop.scrollStyle" :boxShadow="prop.boxShadow" ref=md />
</template>
<script>
import {fetchContent} from '@/api/skill';

export default {
  data() {
    return {
      content: null,
      type:3
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      fetchContent(this.type).then(response => {
        this.content = response.data;
        this.total = response.data.total;
      });

    }
  },
  computed: {
    prop() {
      let data = {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        boxShadow: false//边框
      }
      return data
    }
  }
}
</script>

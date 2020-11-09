<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="inputChange($event.target.value)"/>
    <a-button type="primary" @click="addList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="changeChecked([$event, item.id])">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteData(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span v-cloak>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all'? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone'? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done'? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('getList')
  },
  methods: {
    ...mapMutations(['inputChange', 'deleteData', 'changeChecked', 'clean']),
    // 向列表中增加数据
    addList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('内容不能为空')
      } else {
        this.$store.commit('addList')
      }
    },
    // 修改页面上展示的数据
    changeList (key) {
      this.$store.commit('changeViewKey', key)
    }
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

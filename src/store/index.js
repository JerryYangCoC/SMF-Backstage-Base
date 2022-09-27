import { createStore } from 'vuex'

export default createStore({
  state: {
    member:{id_token:'',access_token:''},
    rfm: { id: '', title: '', number: '', members: '', apiGet: '' },
    toScriptData:{selectedTodo:''}
  },
  actions: {
    getlabelId(context, id) {
      context.commit('GETlabelId', id);
    },
    getlabelTitle(context, title) {
      context.commit('GETlabelTitle', title);
    },
    getlabelNumber(context, number) {
      context.commit('GETlabelNumber', number);
    },
    getlabelMember(context, members) {
      context.commit('GETlabelMember', members);
      console.log("saveMember")
    },
    // login token
    getid_token(context, id_token) {
      context.commit('GETid_token', id_token);
    },
    getaccess_token(context, access_token) {
      context.commit('GETaccess_token', access_token);
    },
    // 傳到劇本的活動名稱等資料
      getselectedTodo(context, selectedTodo){
        context.commit('GetSelectedTodo', selectedTodo)
      }
  },
  mutations: {
    GETlabelId(state, id) {
      state.rfm.id = id;
    },
    GETlabelTitle(state, title) {
      state.rfm.title = title;
    },
    GETlabelNumber(state, number) {
      state.rfm.number = number;
    },
    GETlabelMember(state, members) {
      state.rfm.members = members;
    },
    FetchUser(state, apiGet) {
      state.rfm.apiGet = apiGet
    },
    // login token
    GETid_token(state, id_token) {
      state.member.id_token = id_token;
    },
    GETaccess_token(state, access_token) {
      state.member.access_token = access_token;
    },
     // 傳到劇本的活動名稱等資料
     GetSelectedTodo(state, selectedTodo){
      state.toScriptData.selectedTodo = selectedTodo;
     }
  },
  modules: {
  }
})

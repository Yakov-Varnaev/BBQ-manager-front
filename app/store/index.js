export const state = () => ({
    objects: [],
    departments: [],
    currentObject: null
  })
  
  export const getters = {
    getCounter(state) {
      return state.counter
    },
    getCurrentObject(state) {
        return state.currentObject
    },
    getObjects(state) {
        return state.objects
    },
    getObjectDepartments(state) {
      return state.departments
    }
  }
  
  export const mutations = {
    setCurrentObject(state, obj) {
      state.currentObject = obj
    },
    setObjects(state, objects) {
        state.objects = objects
    },
    setDepartments(state, departments) {
      state.departments = departments
    }
  }
  
  export const actions = {
    async fetchObjects({state, commit}) {
        const res = await this.$axios.get('/objects/');
        console.log(res.data)
        commit('setObjects', res.data)
        if (!state.currentObject && res.data.length > 0) {
            console.log('set cur obj')
            commit('setCurrentObject', res.data[0])
        }
    },
    async setCurrentObject({commit}, obj) {
        commit('setCurrentObject', obj)
        const res = await this.$axios.get(`/objects/${obj.id}/departments/`)
        console.log('departmenst', res.data)
        commit('setDepartments', res.data)
    }
  }
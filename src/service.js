import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5114';

export default {
  getTasks: async () => {
    try {
      const result = await axios.get(`/GetItems`)
      console.log(result.data);
      return result.data;
    }
    catch(error) {
    alert('error')
        console.error(error);
    }
  },

  addTask: async (name) => {
    try {
      const result = await axios.post(`AddItem/${name}`)
      console.log('addTask', name)
      console.log('addTask', name)
      return result.data;
    }
    catch(error) {
        console.error(error);
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`/UpdateItem/${id}`, { id, isComplete })
      console.log('setCompleted', { id, isComplete })
      return result.data;
    }
    catch(error) {
        console.error(error);
    }
  },

  deleteTask: async (Id) => {
    try {
      const result = await axios.delete(`/DeleteItem/${Id}`);
      console.log('deleteTask', Id);
      return result.data;
    }
    catch(error) {
        console.error(error);
    }
  }
};

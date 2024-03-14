<template>
  <q-layout view="lHh Lpr lff">
    <div class="q-pa-md">
      <q-table
        class="no-shadow my-sticky-dynamic"
        flat
        bordered
        :data="rows"
        :rows-per-page-options="[0]"
        :columns="columns"
        hide-bottom
      >
        <template>
          <q-tr class="table-head">
            <q-th style="padding-top: 0px; padding-bottom: 0px">
              <template v-slot:header="props">
                <q-tr class="table-head" :props="props">
                  <q-th
                    v-for="(col, i) in props.cols"
                    :key="i"
                    style="padding-top: 0px; padding-bottom: 0px">
                    {{ col }}
                  </q-th>
                </q-tr>
              </template>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="(cell, i) in props.row" :key="i">
              {{ cell }}
            </q-td>
          </q-tr>
        </template>
        <!-- <template v-slot:top>
          <q-pagination
            v-model="pagination.page"
            :max="maxPages"
            @input="getData"
          ></q-pagination>
        </template> -->
      </q-table>
    </div>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "Vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      token: ref(localStorage.getItem("token")),
      currentShownId: 0,
      pagination: {
        page: 1,
        rowsPerPage: 0, // jumlah item per halaman
      },
      rows: ref(),
    };
  },
  setup() {
    const columns = [
      { name: "Name", label: "Nama", align: "center", field: "u_name" },
      { name: "Divisi", label: "Divisi", align: "center", field: "division" },
      { name: "Jabatan", label: "Jabatan", align: "center", field: "title" },
      { name: "Email", label: "Email", align: "center", field: "u_email" },
    ];
    return {
      columns,
    };
  },
  mounted() {
    this.getData();
  },
  watch:{
    ['dialogName']: {
      handler(value){
        if(!value) this.clearInput()
      }
    }
  },
  methods: {
    //Button Setter
    setButton(rowData, act){
      this.currentShownId = rowData.id
      act != "edit" ? '' : ''
    },
    //Input nuller
    clearInput(){
      listOfModel = []
      for(let index in listOfModel){
        this[index] = null
      }
    },

    async getData() {
      try {
        if(!this.token) throw Error('You must be log in')
        const response = await this.$axios.get(`/user/all`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        
        if (response.status === 200) {
          const { data } = response
          this.rows = data.map(user => ({
            u_name: user.u_name ? user.u_name : "",
            division: user.division ? user.division : "",
            title: user.title ? user.title : "",
            u_email: user.u_email ? user.u_email : "",
          }))
        }
      } catch (err) {
        console.error(err);
      }
    },

    //EDIT START
    async setEditUser(){
      try{
        const { data,status } = await this.$axios.get(`/user/get-by-id/${this.currentShownId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        if(status != 200){ 
          throw Error('Error while fetching data please try again')
          //TODO: CLOSE DIALOG
        }
        // = data.u_name
        // = data.u_email
        // = data.division
        // = data.title
        // = data.u_gender
      }catch(err){
        console.log(err)
        return this.$q.notify({ message: err.message })
      }
    },
    async sendEdit(){
      try{
        const { data, status } = await this.$axios.put(`/user/update-user/${this.currentShownId}`, {
          u_name: "Nadif",
          u_email: "nadif1@gmail.com",
          division: "Acc & Purchase",
          title: "admin",
          u_gender: "Laki - Laki"
        })
        if(status != 200) throw Error(data.message)
        //TODO: CLOSE DIALOG
        return this.$q.notify({ message: data.message })
    }catch(err){
      console.log(err)
      return this.$q.notify({ message: err.message })
    }
    },
    //EDIT END

    //DELETE START
    async deleteUser(){
      try{
        const { status, data } = await this.$axios.delete(`/user/delete-user/${this.currentShownId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        if(status != 200) throw Error(data.message)
        return this.$q.notify({ message: data.message })
    }catch(err){
      console.log(err)
      return this.$q.notify({ message: err.message })
    }
    },
    //DELETE END

    //CREATE START
    openCreateDialog(){
      //Set default Divisi, Jabatan value
    },
    async createUser(){
      try{
        const { status, data } = await this.$axios.post('/user/register', {
          name: "Nadif",
          email:  "nadif@gmail.com",
          password: "password",
          repassword: "password",
          title: "manager",
          divisi: "Acc & Purchase"
        })
        if(status != 200) throw Error('Error while creating user please try again')
        //TODO: CLOSE DIALOG
        return this.$q.notify({ message: 'User created' })
      }catch(err){
        console.log(err)
        return this.$q.notify({ message: err.message })
      }
    },
    //END CREATE
    
    //START UPLOAD
    async sendExcel(){
      try{
        if(!this['excelInputName']) throw Error('Please send a valid excel')
        const { status, data } = await this.$axios.post('/upload/store-user', { file: this['excelFileName']}, {
          headers: {
            "Authorization": `Bearer ${this.token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        if(status != 200) throw Error(data.message)
        //TODO: CLOSE DIALOG
        return this.$q.notify({ message: data.message })
      }catch(err){
        console.log(err)
        return this.$q.notify({ message: err.message })
      }
    }
    //END UPLOAD
  },
});
</script>

<style></style>

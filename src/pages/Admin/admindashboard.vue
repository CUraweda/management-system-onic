<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <div class="q-pa-md">
      <q-btn
        color="primary"
        dense
        no-caps
        label="Add Room"
        @click="adduser = true"
        icon="add"
        class="q-px-sm q-my-md"
      />
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
                    style="padding-top: 0px; padding-bottom: 0px"
                  >
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
            <q-td>
              <div class="row" style="gap: 5px; justify-content: center">
                <div>
                  <q-btn
                    flat
                    rounded
                    size="13px"
                    @click="edituser = true"
                    style="color: #008444"
                    icon="edit"
                  >
                  </q-btn>
                </div>
                <div>
                  <q-btn
                    flat
                    rounded
                    size="13px"
                    @click="deleteuser(props.row)"
                    style="color: #008444"
                    icon="delete"
                  >
                  </q-btn>
                </div>
              </div>
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
    <q-dialog v-model="adduser">
      <q-card class="q-pa-md" style="min-width: 600px">
        <q-bar class="bg-white text-grey rounded-borders q-pa-xs">
          <div class="cursor-pointer non-selectable q-px-md">
            Create New User
          </div>
          <q-space />
        </q-bar>
        <q-form class="q-pa-md q-mx-auto">
          <div style="width: 100%; gap: 5px; display: block" class="row">
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                type="text"
                v-model="inputName"
                dense
                outlined
                style="width: 50%"
                placeholder="Name"
              />

              <q-select
                outlined
                v-model="selectDivisi"
                :options="DivisiOpt"
                dense
                style="width: 50%"
                :label="'Divisi'"
                dropdown-icon="expand_more"
              />
            </div>
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                type="email"
                v-model="inputEmail"
                dense
                outlined
                style="width: 50%"
                placeholder="Email"
              />
              <div style="width: 100%; gap: 5px; display: flex" class="col">
                <q-select
                  outlined
                  v-model="selectJabatan"
                  :options="JabatanOpt"
                  dense
                  style="width: 100%"
                  :label="'Jabatan'"
                  dropdown-icon="expand_more"
                />
                <q-select
                  outlined
                  v-model="selectGender"
                  :options="genderOpt"
                  dense
                  style="width: 100%"
                  :label="'Gender'"
                  dropdown-icon="expand_more"
                />
              </div>
            </div>
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                v-model="password"
                label="password"
                dense
                style="width: 50%"
                outlined
                type="password"
              />
              <q-input
                v-model="confirmpassword"
                label="Confirm Password"
                dense
                style="width: 50%"
                outlined
                type="password"
              />
            </div>
          </div>
          <q-card-section class="row items-center q-gutter-sm">
            <q-btn
              dense
              color="primary"
              @click="postAddUser()"
              no-caps
              style="border-radius: 8px"
              class="q-px-xl"
              >Create</q-btn
            >
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edituser">
      <q-card class="q-pa-md" style="min-width: 600px">
        <q-bar class="bg-white text-grey rounded-borders q-pa-xs">
          <div class="cursor-pointer non-selectable q-px-md">
            Create New User
          </div>
          <q-space />
        </q-bar>
        <q-form class="q-pa-md q-mx-auto">
          <div style="width: 100%; gap: 5px; display: block" class="row">
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                type="text"
                v-model="inputName"
                dense
                outlined
                style="width: 50%"
                placeholder="Name"
              />

              <q-select
                outlined
                v-model="selectDivisi"
                :options="DivisiOpt"
                dense
                style="width: 50%"
                :label="'Divisi'"
                dropdown-icon="expand_more"
              />
            </div>
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                type="email"
                v-model="inputEmail"
                dense
                outlined
                style="width: 50%"
                placeholder="Email"
              />
              <div style="width: 100%; gap: 5px; display: flex" class="col">
                <q-select
                  outlined
                  v-model="selectJabatan"
                  :options="JabatanOpt"
                  dense
                  style="width: 100%"
                  :label="'Jabatan'"
                  dropdown-icon="expand_more"
                />
                <q-select
                  outlined
                  v-model="selectGender"
                  :options="genderOpt"
                  dense
                  style="width: 100%"
                  :label="'Gender'"
                  dropdown-icon="expand_more"
                />
              </div>
            </div>
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                v-model="password"
                label="password"
                dense
                style="width: 50%"
                outlined
                type="password"
              />
              <q-input
                v-model="confirmpassword"
                label="Confirm Password"
                dense
                style="width: 50%"
                outlined
                type="password"
              />
            </div>
          </div>
          <q-card-section class="row items-center q-gutter-sm">
            <q-btn
              dense
              color="primary"
              @click="postAddUser()"
              no-caps
              style="border-radius: 8px"
              class="q-px-xl"
              >Create</q-btn
            >
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 0, // jumlah item per halaman
      },
      inputName: ref(""),
      inputEmail: ref(""),
      selectDivisi: ref(),
      selectJabatan: ref(),
      password: ref(),
      confirmpassword: ref(),
      DivisiOpt: ref([
        "Oprasional Sales",
        "Acc & Purches",
        "Produksi",
        "HRD & GA",
        "Marketing",
      ]),
      JabatanOpt: ref([
        "admin",
        "supervisor",
        "direktur",
        "manager",
        "operator",
      ]),
      selectGender: ref(),
      genderOpt: ref(["Laki - Laki", "Perempuan"]),
    };
  },
  setup() {
    const columns = [
      { name: "Name", label: "Name", align: "left", field: "Name" },
      { name: "Divisi", label: "Divisi", align: "left", field: "Divisi" },
      { name: "Jabatan", label: "Jabatan", align: "left", field: "Jabatan" },
      { name: "Email", label: "Email", align: "left", field: "Email" },
      { name: "", label: "Action", align: "center", field: "" },
    ];

    return {
      edituser: ref(false),
      adduser: ref(false),
      columns,
      rows: ref([]),
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await this.$axios.get(`/user/all`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        // console.log(response.data);
        if (response.status == 200) {
          const data = response.data;
          this.rows = data.map((list) => ({
            Name: list.u_name,
            Divisi: list.division,
            Jabatan: list.title,
            Email: list.u_email,
          }));
          console.log(this.rows);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    async postAddUser() {
      try {
        const response = await this.$axios.post(
          `/user/all`,
          {
            // data to be sent in the request body, if any
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (response.status == 200) {
          const data = response.data;
          this.rows = data.map((list) => ({
            Name: list.u_name,
            Divisi: list.division,
            Jabatan: list.title,
            Email: list.u_email,
          }));
          console.log(this.rows);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    deleteuser() {},
    updateuser() {},
  },
});
</script>

<style></style>

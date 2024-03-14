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
            <q-td v-for="(cell, key, i) in props.row" :key="i">
              {{ cell.data }}
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
      pagination: {
        page: 1,
        rowsPerPage: 0, // jumlah item per halaman
      },
    };
  },
  setup() {
    const columns = [
      { name: "Name", label: "Name", align: "center", field: "Name" },
      { name: "Divisi", label: "Divisi", align: "center", field: "Divisi" },
      { name: "Jabatan", label: "Jabatan", align: "center", field: "Jabatan" },
      { name: "Email", label: "Email", align: "center", field: "Email" },
    ];

    // const rows = [
    //   {
    //     RoomNp: "Frozen Yogurt",
    //     Image: 159,
    //   },
    // ];
    return {
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
  },
});
</script>

<style></style>

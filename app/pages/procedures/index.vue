<template>
  <div>
    <ProcedureForm :createProcedure="createProcedure" @create="createProcedure"/>
    <ProcedureTable :procedures="procedures" />
  </div>
</template>

<script>
export default {
    props: {
        name: "",
    },
    methods: {
      createProcedure(procedure) {
        this.procedures.push(procedure)
      }
    },
    data() {
        return {
            procedures: [
                { "id": 1, "name": "Name 1" },
                { "id": 2, "name": "Name 2" },
                { "id": 3, "name": "Name 3" },
                { "id": 4, "name": "Name 4" },
            ]
        };
    },
}
</script>

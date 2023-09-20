<template>
  <Box class="card">
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "N/D" }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
      <button class="button ml-2">
        <span class="icon is-small" @click="tarefaClicada">
          <i class="fas fa-pencil-alt"></i>
        </span>
      </button>
      <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
        <span class="icon is-small">
          <i class="fas fa-trash"></i>
        </span>
      </button>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import Cronometro from "./Cronometro.vue";
import Box from "./Box.vue";
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";

export default defineComponent({
  name: "TarefaVue",
  components: {
    Cronometro,
    Box,
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  emits: ["aoTarefaClicada"],
  methods: {
    excluir(id: string) {
      this.store.commit("EXCLUIR_TAREFA", id);
    },
    tarefaClicada() {
      this.$emit("aoTarefaClicada", this.tarefa);
    },
  },
  computed: {
    tempoGasto(): string {
      return new Date(this.tarefa.duracaoEmSegundos * 1000)
        .toISOString()
        .substr(11, 8);
    },
  },
  setup() {
    const store = useStore();
    return {
      tarefas: computed(() => store.state.projetos),
      store,
    };
  },
});
</script>

<template>
    <button class="button" @click="clicado" :disabled="desabilitado">
        <span class="icon">
            <i :class=icone></i>
        </span>
        <span>{{texto}}</span>
    </button>
</template>
<script lang="ts">

import  {defineComponent} from 'vue';


export default defineComponent({
    name:"FormularioNome",
    props:{
        texto:{
            type: String,
        },
        icone:{
            type: String,
            required: true
        },
        desabilitado:{
            type :Boolean,
            required: true
            
        }
    },
    emits:['clicado'],
    methods:{
        clicado(){
            this.$emit('clicado');
        }
    }
});
</script>

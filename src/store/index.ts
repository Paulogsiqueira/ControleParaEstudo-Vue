import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from 'vue'
import { INotificacao } from "@/interfaces/INotificacao";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
    tarefas: ITarefa[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [
            {
                "id": "1",
                "nome": "Vue",
            },
            {
                "id": "2",
                "nome": "TypeScript",
            },
            {
                "id": "3",
                "nome": "JavaScript",
            },
            {
                "id": "4",
                "nome": "CSS",
            },
        ],
        tarefas: [
            {
                "id": "1",
                "duracaoEmSegundos": 9000,
                "descricao": "Vuex",
                "projeto": {
                    "id": "1",
                    "nome": "Vue"
                },
            },
            {
                "id": "2",
                "duracaoEmSegundos": 6000,
                "descricao": "Vue Store",
                "projeto": {
                    "id": "1",
                    "nome": "Vue"
                },
            },
            {
                "id": "3",
                "duracaoEmSegundos": 7200,
                "descricao": "Tipagem",
                "projeto": {
                    "id": "2",
                    "nome": "TypeScript"
                },
            },
            {
                "id": "4",
                "duracaoEmSegundos": 3600,
                "descricao": "Metodos e funções nativas",
                "projeto": {
                    "id": "3",
                    "nome": "JavaScript"
                },
            },
            {
                "id": "5",
                "duracaoEmSegundos": 4500,
                "descricao": "Flex e Grid",
                "projeto": {
                    "id": "4",
                    "nome": "CSS"
                },
            }
        ],
        notificacoes: []
    },
    mutations: {
        ["ADICIONA_PROJETO"](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        ["ALTERA_PROJETO"](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        ["EXCLUIR_PROJETO"](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        ["EXCLUIR_TAREFA"](state, id: string) {
            state.tarefas = state.tarefas.filter(tarefa => tarefa.id != id)
        },
        ["NOTIFICAR"](state, novaNotificacao: INotificacao) {

            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
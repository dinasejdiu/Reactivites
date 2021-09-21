import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { format } from 'date-fns';
import { Kengetari } from "../models/kengetari";

export default class KengetariStore {
    kengetariRegistry = new Map<string, Kengetari>();
    selectedKengetari: Kengetari | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)

    }

    get kengetariesByDate() {
        return Array.from(this.kengetariRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedKengetaries() {
        return Object.entries(
            this.kengetariesByDate.reduce((kengetaries, kengetari) => {
                const date = format(kengetari.date!, 'dd MMM yyyy');
                kengetaries[date] = kengetaries[date] ? [...kengetaries[date], kengetari] : [kengetari];
                return kengetaries;
            }, {} as { [key: string]: Kengetari[] })
        )
    }
    loadKengetaries = async () => {
        this.loadingInitial = true;
        try {
            const kengetaries = await agent.Kengetaries.list();
            kengetaries.forEach(kengetari => {
                this.setKengetari(kengetari);

            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

  
    private setKengetari = (kengetari: Kengetari) => {
        kengetari.date = new Date(kengetari.date!);
        this.kengetariRegistry.set(kengetari.id, kengetari);

    }

    private getKengetari = (id: string) => {
        return this.kengetariRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }



    createKengetari = async (kengetari: Kengetari) => {
        this.loading = true;
        try {
            await agent.Kengetaries.create(kengetari);
            runInAction(() => {
                this.kengetariRegistry.set(kengetari.id, kengetari)
                this.selectedKengetari = kengetari;
                this.editMode = false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateKengetari = async (kengetari: Kengetari) => {
        this.loading = true;
        try {
            await agent.Kengetaries.update(kengetari);
            runInAction(() => {
                this.kengetariRegistry.set(kengetari.id, kengetari);
                this.selectedKengetari = kengetari;
                this.editMode = false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteKengetari = async (id: string) => {
        this.loading = true;
        try {

            await agent.Kengetaries.delete(id);
            runInAction(() => {
                this.kengetariRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })

        }
    }
}

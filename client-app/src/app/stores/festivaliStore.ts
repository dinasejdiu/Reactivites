import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { format } from 'date-fns';
import { Festivali } from "../models/festivali";

export default class FestivaliStore {
    festivaliRegistry = new Map<string, Festivali>();
    selectedFestivali: Festivali | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)

    }

    get festivalesByDate() {
        return Array.from(this.festivaliRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedFestivales() {
        return Object.entries(
            this.festivalesByDate.reduce((festivales, festivali) => {
                const date = format(festivali.date!, 'dd MMM yyyy');
                festivales[date] = festivales[date] ? [...festivales[date], festivali] : [festivali];
                return festivales;
            }, {} as { [key: string]: Festivali[] })
        )
    }
    loadFestivales = async () => {
        this.loadingInitial = true;
        try {
            const festivales = await agent.Festivales.list();
            festivales.forEach(festivali => {
                this.setFestivali(festivali);

            })
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadFestivali = async (id: string) => {
        let festivali = this.getFestivali(id);
        if (festivali) {
            this.selectedFestivali = festivali;
            return festivali;
        } else {
            this.loadingInitial = true;
            try {
                festivali = await agent.Festivales.details(id);
                this.setFestivali(festivali);
                runInAction(() => {
                    this.selectedFestivali = festivali;
                })
                this.setLoadingInitial(false);
                return festivali;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }

        }
    }

    private setFestivali = (festivali: Festivali) => {
        festivali.date = new Date(festivali.date!);
        this.festivaliRegistry.set(festivali.id, festivali);

    }

    private getFestivali = (id: string) => {
        return this.festivaliRegistry.get(id);
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }



    createFestivali = async (festivali: Festivali) => {
        this.loading = true;
        try {
            await agent.Festivales.create(festivali);
            runInAction(() => {
                this.festivaliRegistry.set(festivali.id, festivali)
                this.selectedFestivali = festivali;
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

    updateFestivali = async (festivali: Festivali) => {
        this.loading = true;
        try {
            await agent.Festivales.update(festivali);
            runInAction(() => {
                this.festivaliRegistry.set(festivali.id, festivali);
                this.selectedFestivali = festivali;
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
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {

            await agent.Festivales.delete(id);
            runInAction(() => {
                this.festivaliRegistry.delete(id);
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

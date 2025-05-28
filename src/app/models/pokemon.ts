export interface Pokemon {
    id: string;
    name: string;
    image: string;
    mainType: string;
    subType?: string;
    hp:number;
    atk:number;
    def:number;
    spAtk:number;
    spDef:number;
    spd:number;
    total:number;
}

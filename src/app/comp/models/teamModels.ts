import { TeamCoach, UserM } from "./userModels";

export interface Team {
    //Developer
    devCheck?: boolean;
    //High School
    teamSubCategory: string;
    //AAU
    teamSubLocal: boolean;
    teamSubNational: boolean;
    teamSubCircuit: boolean;
    pumaCircuit: boolean;
    adidasCircuit: boolean;
    nikeCircuit: boolean;
    underArmourCircuit: boolean;

    ownerId: string,
    sponsored: boolean;
    teamName: string,
    teamId: string,
    teamAbbreviation: string,
    teamCategory: string,
    teamLogoUrl: string,
    teamUnits?: TeamUnit[],
}
export interface TeamUnit {
    unitDivision?: string,
    ownerId: string,
    priority?: number,
    teamLogoUrl: string,
    teamName: string,
    teamAbbreviation: string,
    timestamp?: any,
    teamId: string,
    teamUnitId: string,
    teamUnitName: string,
    teamUnitManagersIds: string[],
    teamUnitManagers: UserM[],
    participantIds?: string[],
    teamUnitCoach?: TeamCoach,
    teamUnitFlavor: string,
    teamUnitPlayers: UserM[],
    divisionCode?: string,
    // Remove
    teamUnitCoachPhoto?: string,
    teamUnitCoachId?: string,
    teamUnitCoachMail?: string,
    teamUnitCoachFirstName?: string,
    teamUnitCoachLastName?: string,
}

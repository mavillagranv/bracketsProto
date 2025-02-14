import { TeamUnit } from "./teamsModels"

export interface Venues {
    venueId?: string,
    venueName: string,
    venueAddress: string,
    ZIPCode?: string,
    venueCity: string,
    venueState: string,
    venueStateAbb: string,
    venuePhoto: string
}
export interface VenueCourts {
    courtId: string,
}
export interface EventFee {
    feeDesc: string,
    feeAmount: number
}
export interface LocationModel {
    state: string,
    city: string,
    stateAbb: string
}
export interface EventModel {
    //Contact
    contactMail: string,
    contactPhone: number,
    contactFullName: string,
    //General
    active: boolean,
    eventLogo?: string,
    //organizationLogo?: string,
    eventIsOpen: boolean,
    userId: string,
    eventId: string,
    //Info
    eventName: string,
    eventDescription: string,
    eventGeneralInfo: string,
    eventEntryFees: EventFee[],
    eventVenues: Venues[],
    eventDateStart: any,
    eventDateEnd: any,
    //Location
    eventCity: string,
    eventState: string,
    eventStateAbb: string,
    //Gender
    eventForMales: boolean,
    eventForFemales: boolean,
    eventMixed: boolean,
    //Organization
    eventCategories: EventCategory[]
    eventSchedule?: [],//Missing
    eventRegisteredTeams?: [],//Missing
    //Depreciated
    eventCourts?: number

}
export interface EventCategory {
    category: string,
    gender: string,
    code: string,
    closed: boolean
}
export interface GameModel {
    gameId?: string,
    scheduled?: boolean,
    active: boolean,
    participants?: string[]
    dateStart: any,
    dateEnd: any,
    teamUnit1: TeamUnit,
    teamUnit2: TeamUnit,
    venue?: Venues,
    eventName: string,
    eventId: string,
    refereeId: string
    homeAway?: boolean
}
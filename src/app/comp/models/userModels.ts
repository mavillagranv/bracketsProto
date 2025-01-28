export interface TeamAdministrator {
    userId: string,
    userMail: string,
    userFirstName: string,
    userLastName: string,
    isTeamAdministrator: boolean
}
export interface DeveloperM {
    userId: string,
    userMail: string,
    userFirstName: string,
    userLastName: string,
    isDeveloper: boolean
}
export interface Administrator {
    userId: string
    userMail: string,
    userFirstName: string,
    userLastName: string,
    userIsAdmin: boolean
}
export interface EventOrganizer {
    userId: string,
    userFirstName: string,
    userLastName: string,
    userMail: string,
    contactEmail: string,
    contactPhone: string
}
export interface UserM {
    //For admins
    eventOrganizer?: boolean,
    userCreated?: any,
    betaTester?: boolean,
    teamAdmin?: boolean,
    developer?: boolean,
    timestamp?: any,
    firstUpdate: boolean,
    userIsAdmin?: boolean,
    isTeamAdministrator?: boolean,
    //Personal information not changable
    userDisplayName: string,
    userId: string,
    userPhotoUrl: string,
    userMail: string,
    //Profile information
    useGooglePhoto?: boolean,
    profilePicture?: string,
    coverPicture?: string,
    //Personal information 
    playerIsActive?: boolean,
    userIsParent?: string,
    userIsCoach?: boolean,
    userFirstName?: string,
    userLastName?: string,
    //userMiddleName?: string,
    userUsername?: string,
    playerCity?: string,
    //Socials
    userInstagram?: string,
    userX?: string,
    userYoutube?: string,
    //Player properties
    playerDOB?: any,
    playerClassOf?: number,
    playerHeight?: string,
    playerPosition?: string,
    playerSchool?: string,
    //Coach properties
    coachSchool?: string,
}
export interface Player {
    userFirstName?: string,
    userLastName?: string,
    userId: string,
    playerCategory?: string,
    playerCity?: string
    playerGrade?: number,
    playerHeight?: string,
    playerIsActive: boolean,
    playerNumber?: number,
    playerPosition?: string,
}
export interface Parent {
    userIsParent: boolean
    playerArray: [
        {
            userId: String,
            userFirstName: string,
            userLastName: string
        }
    ]
}
export interface Coach {
    userIsCoach: boolean

}
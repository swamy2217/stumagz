export interface QuizDetails {
    id?: string;
    type?: string;
    skillCode?: string;
    brandCode?: string;
    magazineCode?: string;
    name?: string;
    topic?: string;
    description?: string;
    instructions?: string;
    coverImageUrl?: string;
    videoUrl?: string;
    numberOfQuestions?: number;
    durationInMinutes?: number;
    startTime?: string;
    endTime?: string;
    author?: string;
    deletedQuiz?: boolean;
    rewards?: any;
    status?: string;
    allowedOperations?: AllowedOperations;
}

export interface AllowedOperations {
    attempt?: boolean;
    leaderBoard?: boolean;
    review?: boolean;
}

export interface Quiz {
    id: string;
    attemptQuestions: AttemptQuestions[];
    status?: string;
    startTime?: string;
    durationInMilliSeconds?: number;
    timeElapsedInMilliSeconds?: number;
}

export interface AttemptQuestions {
    question: QuizQuestion;
    chosenOption?: number;
    correctOption?: number;
}

export interface QuizQuestion {
    sno: number;
    text: string;
    type?: string;
    imageUrl?: string;
    options?: Option[];
}

export interface Option {
    sno: number;
    text: string;
    imageUrl?: string;
    correctOption?: boolean;
    selected?: boolean;
}

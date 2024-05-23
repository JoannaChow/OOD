interface IEntity {
    upvote();
    downvote();
}

abstract class Entity implements IEntity {
    vote: number;
    followUps: FollowUp[];
    member: Member;
    constructor(member: Member) {
        this.vote = 0;
        this.followUps = [];
        this.member = member;
    }
    upvote() {
        this.vote++;
    }
    downvote() {
        this.vote--;
    }
    add_followUp(followUp: FollowUp) {
        this.followUps.push(followUp);
    }
}

class Question extends Entity {
    title: string;
    description: string;
    answers: Answer[];
    modified_flag: boolean;
    constructor(title: string, description: string, member: Member) {
        super(member);
        this.title = title;
        this.description = description;
        this.answers = [];
        this.modified_flag = false;
    }

    modify_description(content: string) {
        this.description = content;
        this.modified_flag = true;
    }
}

class Answer extends Entity {
    description: string;
    isAccepted: boolean;
    constructor(description: string, member: Member) {
        super(member);
        this.description = description;
        this.isAccepted = false;
    }
    accept() {
        this.isAccepted = true;
    }
}

class FollowUp extends Entity {
    constructor(member: Member) {
        super(member);
        this.followUps = [];
    }
}

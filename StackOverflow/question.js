class Entity {
    constructor(member) {
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
    add_followUp(followUp) {
        this.followUps.push(followUp);
    }
}
class Question extends Entity {
    constructor(title, description, member) {
        super(member);
        this.title = title;
        this.description = description;
        this.answers = [];
        this.modified_flag = false;
    }
    modify_description(content) {
        this.description = content;
        this.modified_flag = true;
    }
}
class Answer extends Entity {
    constructor(description, member) {
        super(member);
        this.description = description;
        this.isAccepted = false;
    }
    accept() {
        this.isAccepted = true;
    }
}
class FollowUp extends Entity {
    constructor(member) {
        super(member);
        this.followUps = [];
    }
}
//# sourceMappingURL=question.js.map
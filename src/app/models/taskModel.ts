export class Task{
    constructor(
        public id:number,
        public name:string,
        public state:boolean,
        public hour:number,
        public minute:number,
        public second:number
    ){}
}
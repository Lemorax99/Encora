import { Component, OnInit } from '@angular/core';
//Models
import{Task} from '../app/models/taskModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'encora';
  public task:Task;
  public tasks:Task[];
  public page:string;
  constructor(){
    this.tasks = [];
    this.task=new Task(0, "",false,0,0,0);
    this.page="main";
  }
  ngOnInit(){

  }
  register(Form){
    if (this.page=='main'){
      this.page='register';
    }else{
      if(this.page=='edit'){
        if((this.task.hour==0 && this.task.minute==0 && this.task.second==0)||this.task.minute>60 || this.task.second>60){
          alert("Formato de tiempo incorrecto");
        }else{
          for(let _task of this.tasks){
            if(_task['id']==this.task['id']){
              _task=JSON.parse(JSON.stringify(this.task));
            }
            this.page='main';
          }
        }
      }else{
        if((this.task.hour==0 && this.task.minute==0 && this.task.second==0)||this.task.minute>60 || this.task.second>60){
          alert("Formato de tiempo incorrecto");
        }else{
          this.task['id']=this.tasks.length+1;
          this.tasks.push(JSON.parse(JSON.stringify(this.task)));
          console.log(this.tasks);
          this.page='main';
        }
      }
    }
  }
  play(_task){
    _task.state=!_task.state;
    var start = function(){
      if(_task.state==false){
        clearInterval(intervalo);
        return;
      }
      console.log(_task.hour,_task.minute,_task.second);
      if(_task.second==0){
        if(_task.minute==0){
          if(_task.hour!=0){
            _task.minute=59;
            _task.hour=_task.hour-1;
          }else{
            clearInterval(intervalo);
          }
        }else{
          _task.minute=_task.minute-1;
          _task.second=59;
        }
      }else{
        _task.second=_task.second-1;
      }
    }
    var intervalo = setInterval(start,1000);
  }
  edit(id){
    for(let _task of this.tasks){
      if(_task['id']==id){
        this.task=_task
      }
      this.page='edit';
    }
  }
  delete(id){
    for(var i=0;i<this.tasks.length;i++){
      if(this.tasks[i]['id']==id){
        this.tasks.splice(i,1);
      }
    }
  }
}

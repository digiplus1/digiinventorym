import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testnavigation',
  templateUrl: './testnavigation.component.html',
  styleUrls: ['./testnavigation.component.scss'],
})
export class TestnavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const list=document.querySelectorAll('.list');
    function activelink(){
      list.forEach((item)=>item.classList.remove('active'));
      this.classList.add('active');
    }
    list.forEach((item)=>
      item.addEventListener('click',activelink))
  }

}

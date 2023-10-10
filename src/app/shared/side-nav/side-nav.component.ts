import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{


  page?: string;
  selected?: string;
  currentUrl?: string;
  menus = [
    { name: 'Accounts', link: '/accounts'},
    { name: 'Transactions', link: '/transactions' },
    // { name: 'EOD Reports', link: '/eod-reports'},
  ];

  constructor() { }

  
  ngOnInit(): void {
    this.page = window.location.pathname;
    this.currentUrl = window.location.href;
    this.selected = this.menus.find(menu => menu.link === this.page)?.name;

  }
}

import {Component, HostListener, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {params} from '../../params';
import {urls} from '../../urls';

@Component({
  selector: 'app-providers',
  templateUrl: './providersList.html',
  styleUrls: ['./providersList.css']
})
export class ProvidersListComponent implements OnInit {
  private innerWidth;
  public selectionMap = {
    'Provider Id': false, 'Provider Name': false,
    'Provider Street Address': false, 'Provider City': false,
    'Provider State': false, 'Provider Zip Code': false,
    'Hospital Referral Region Description': false,
    'Total Discharges': false, 'Average Covered Charges': false,
    'Average Total Payments': false, 'Average Medicare Payments': false
  };
  public queryMap = {
   'max_discharges': null,
     'min_discharges': null,
     'max_average_covered_charges': null,
      'min_average_covered_charges': null,
      'min_average_medicare_payments': null,
     'max_average_medicare_payments': null,
     'state': ''
  }
  public selectors = [];
  public queries = [];
  public providersData: any = [];
  public pageSize = 10;
  public page = 1;
  public totalProviders;
  constructor( private _dataService: DataService) {
    this.selectors = Object.keys(this.selectionMap);
    this.queries = Object.keys(this.queryMap);
  }
  ngOnInit() {
    this.getProvidersData();
  }
  getProvidersData(isSmallDisplay?) {
    console.log(isSmallDisplay);
    this._dataService.callRestful('GET', params.SERVER.INFO + urls.PROVIDERS.GET
      + '?page=' + this.page + '&pageSize=' + this.pageSize + this.makeQueryString(isSmallDisplay))
      .subscribe(
        data => {
          if (data['status'] > 0) {
            this.totalProviders = data['count'];
            this.providersData = data['data'].map(
              x => {
                if (x['_id']) {
                  delete x['_id'];
                }
                return x;
              });
          }
        });
  }
  makeQueryString(isSmallDisplay): string {
    let qString = '';
    this.queries.forEach(
      x => {
        if (this.queryMap[x] !== null && this.queryMap[x] !== '') {
          qString += '&' + x + '=' + this.queryMap[x];
        }
      });
    return isSmallDisplay ? '' : this.makeSelectionString() + qString;
  }
  makeSelectionString(): string {
    const selectionQuery = {};
    this.selectors.forEach(
      x => {
        if (this.selectionMap[x]) {
          selectionQuery[x] = 1;
        }
      });
    return '&selection=' + JSON.stringify(selectionQuery);
  }
  onSelectorToggle(e, _selector) {
    this.selectionMap[_selector] = e.target.checked;
    this.getProvidersData();
  }
  onQueryChange(e) {
    this.queryMap[e.target.name] = e.target.value;
    this.getProvidersData();
  }
  onPageChange() {
    this.getProvidersData();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (!this.innerWidth) {
      this.innerWidth = window.innerWidth;
    }
    if (window.innerWidth > 767 && this.innerWidth <= 767) {
      this.innerWidth = window.innerWidth;
      this.getProvidersData();
    }
    if (window.innerWidth <= 767 && this.innerWidth > 767) {
      this.innerWidth = window.innerWidth;
      this.getProvidersData(true);
    }
  }
}

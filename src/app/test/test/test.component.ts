import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {HubTableComponent} from '../../hub-common/components/hub-table/hub-table.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSelect, MatSelectChange} from '@angular/material';
import {shiftAnimation} from '../../hub-common/animations/shift.animation';
import {appearAnimation} from '../../hub-common/animations/appear.animation';
import {RemovableOptionComponent} from '../../hub-common/components/removable-option/removable-option.component';
import {Preset} from '../../hub-common/model/Preset';
import {KeyValue} from '@angular/common';

const TestData: any[] = [
  {
    'Anyja Enar': 'HU3254362629',
    ENAR: 'HU3394802001',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '265.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208618831',
    ENAR: 'HU3208651540',
    'Születési dátum': '2018.04.13',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '231.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3281709954',
    ENAR: 'HU3394801952',
    'Születési dátum': '2018.04.07',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '245.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208635669',
    ENAR: 'HU3208651292',
    'Születési dátum': '2018.04.06',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '240.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208611171',
    ENAR: 'HU3394802119',
    'Születési dátum': '2018.04.13',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '245.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208644393',
    ENAR: 'HU3394802094',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '227.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3281709923',
    ENAR: 'HU3394802195',
    'Születési dátum': '2018.04.15',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'zsemleszínű',
    'Valasztasi suly': '214.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3129007145',
    ENAR: 'HU3394801868',
    'Születési dátum': '2018.04.03',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '227.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208637951',
    ENAR: 'HU3208651401',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '248.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631009',
    ENAR: 'HU3208651449',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '250.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208613146',
    ENAR: 'HU3394802126',
    'Születési dátum': '2018.04.13',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '225.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3239471481',
    ENAR: 'HU3425900335',
    'Születési dátum': '2018.04.20',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '236.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208637571',
    ENAR: 'HU3208651494',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '228.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208630518',
    ENAR: 'HU3208651689',
    'Születési dátum': '2018.04.18',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '220.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208615616',
    ENAR: 'HU3394802708',
    'Születési dátum': '2018.05.14',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'zsemletarka',
    'Valasztasi suly': '208.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208638783',
    ENAR: 'HU3208651191',
    'Születési dátum': '2018.04.02',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '222.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208619980',
    ENAR: 'HU3208651906',
    'Születési dátum': '2018.04.27',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '215.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208635690',
    ENAR: 'HU3208651317',
    'Születési dátum': '2018.04.06',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '240.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631009',
    ENAR: 'HU3208651432',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '210.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208612105',
    ENAR: 'HU3394802373',
    'Születési dátum': '2018.04.23',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '220.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208641589',
    ENAR: 'HU3394801899',
    'Születési dátum': '2018.04.03',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '240.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631580',
    ENAR: 'HU3208651797',
    'Születési dátum': '2018.04.20',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'zsemletarka',
    'Valasztasi suly': '260.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3281709240',
    ENAR: 'HU3394802289',
    'Születési dátum': '2018.04.17',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208619670',
    ENAR: 'HU3208652219',
    'Születési dátum': '2018.05.21',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '238.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3251700390',
    ENAR: 'HU3425900359',
    'Születési dátum': '2018.04.25',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '219.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208642133',
    ENAR: 'HU3394802412',
    'Születési dátum': '2018.04.24',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'zsemleszínű',
    'Valasztasi suly': '220.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631085',
    ENAR: 'HU3208651610',
    'Születési dátum': '2018.04.16',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '220.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208638031',
    ENAR: 'HU3208651564',
    'Születési dátum': '2018.04.15',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '213.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208617218',
    ENAR: 'HU3394801882',
    'Születési dátum': '2018.04.04',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '228.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208617535',
    ENAR: 'HU3394802049',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '212.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208633911',
    ENAR: 'HU3208651805',
    'Születési dátum': '2018.04.22',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '223.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208618956',
    ENAR: 'HU3208652125',
    'Születési dátum': '2018.05.10',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '210.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208618110',
    ENAR: 'HU3208652288',
    'Születési dátum': '2018.05.29',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '220.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208612390',
    ENAR: 'HU3394801844',
    'Születési dátum': '2018.04.04',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '214.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631744',
    ENAR: 'HU3208651780',
    'Születési dátum': '2018.04.20',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '208.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208638808',
    ENAR: 'HU3208651968',
    'Születési dátum': '2018.04.29',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'zsemleszínű',
    'Valasztasi suly': '198.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208639344',
    ENAR: 'HU3394802140',
    'Születési dátum': '2018.04.14',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '211.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208620191',
    ENAR: 'HU3208651456',
    'Születési dátum': '2018.04.13',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '235.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208614118',
    ENAR: 'HU3394801990',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '190.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208630037',
    ENAR: 'HU3208652000',
    'Születési dátum': '2018.04.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '205.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208636840',
    ENAR: 'HU3208651603',
    'Születési dátum': '2018.04.15',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631535',
    ENAR: 'HU3208651672',
    'Születési dátum': '2018.04.18',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '205.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208615452',
    ENAR: 'HU3394802429',
    'Születési dátum': '2018.04.24',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208642892',
    ENAR: 'HU3394801921',
    'Születési dátum': '2018.04.04',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3217805808',
    ENAR: 'HU3394802234',
    'Születési dátum': '2018.04.17',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '217.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631148',
    ENAR: 'HU3208652132',
    'Születési dátum': '2018.05.10',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208642436',
    ENAR: 'HU3394802481',
    'Születési dátum': '2018.04.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '180.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208618367',
    ENAR: 'HU3208651209',
    'Születési dátum': '2018.04.01',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '189.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208617131',
    ENAR: 'HU3394802405',
    'Születési dátum': '2018.04.24',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208630316',
    ENAR: 'HU3208651829',
    'Születési dátum': '2018.04.25',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '207.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631838',
    ENAR: 'HU3208651386',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '187.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208638288',
    ENAR: 'HU3208652118',
    'Születési dátum': '2018.05.08',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631388',
    ENAR: 'HU3208651999',
    'Születési dátum': '2018.04.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '175.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208638581',
    ENAR: 'HU3208652240',
    'Születési dátum': '2018.05.29',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'zsemleszínű',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208621505',
    ENAR: 'HU3208651641',
    'Születési dátum': '2018.04.17',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '206.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208630695',
    ENAR: 'HU3208651951',
    'Születési dátum': '2018.04.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '190.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208635715',
    ENAR: 'HU3208651898',
    'Születési dátum': '2018.04.26',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '181.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208637076',
    ENAR: 'HU3208651254',
    'Születési dátum': '2018.04.06',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '188.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208620780',
    ENAR: 'HU3208651836',
    'Születési dátum': '2018.04.25',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '175.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208630309',
    ENAR: 'HU3208651843',
    'Születési dátum': '2018.04.25',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '215.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208639421',
    ENAR: 'HU3208652264',
    'Születési dátum': '2018.05.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '185.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208640966',
    ENAR: 'HU3394802304',
    'Születési dátum': '2018.04.18',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '192.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3281709637',
    ENAR: 'HU3394802784',
    'Születési dátum': '2018.05.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'zsemleszínű',
    'Valasztasi suly': '194.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208629756',
    ENAR: 'HU3208651812',
    'Születési dátum': '2018.04.24',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '185.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3281708317',
    ENAR: 'HU3394802241',
    'Születési dátum': '2018.04.17',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '190.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208610781',
    ENAR: 'HU3394802474',
    'Születési dátum': '2018.04.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '170.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631395',
    ENAR: 'HU3208652031',
    'Születési dátum': '2018.05.03',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '183.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208616291',
    ENAR: 'HU3394802669',
    'Születési dátum': '2018.05.15',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '181.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208636701',
    ENAR: 'HU3208652170',
    'Születési dátum': '2018.05.13',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '161.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208629770',
    ENAR: 'HU3208652156',
    'Születési dátum': '2018.05.10',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '168.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208641565',
    ENAR: 'HU3394802722',
    'Születési dátum': '2018.05.18',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '165.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208620829',
    ENAR: 'HU3208651588',
    'Születési dátum': '2018.04.15',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '160.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3254431222',
    ENAR: 'HU3394801976',
    'Születési dátum': '2018.04.11',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '173.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631782',
    ENAR: 'HU3208651728',
    'Születési dátum': '2018.04.20',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '190.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3254431082',
    ENAR: 'HU3394802328',
    'Születési dátum': '2018.04.19',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '150.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208618824',
    ENAR: 'HU3208651348',
    'Születési dátum': '2018.04.07',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '171.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3281708951',
    ENAR: 'HU3394802676',
    'Születési dátum': '2018.05.14',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '175.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208631388',
    ENAR: 'HU3208651982',
    'Születési dátum': '2018.04.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '163.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208630741',
    ENAR: 'HU3208652334',
    'Születési dátum': '2018.06.21',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '155.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3254301026',
    ENAR: 'HU3425900342',
    'Születési dátum': '2018.04.23',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '170.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208619113',
    ENAR: 'HU3208652303',
    'Születési dátum': '2018.06.02',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '157.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208615058',
    ENAR: 'HU3394802931',
    'Születési dátum': '2018.06.23',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '174.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208617559',
    ENAR: 'HU3394802690',
    'Születési dátum': '2018.05.15',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '185.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208608661',
    ENAR: 'HU3394802450',
    'Születési dátum': '2018.04.26',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '200.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208615818',
    ENAR: 'HU3394802924',
    'Születési dátum': '2018.06.18',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '175.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208618949',
    ENAR: 'HU3208652295',
    'Születési dátum': '2018.06.02',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '154.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3254362698',
    ENAR: 'HU3394802791',
    'Születési dátum': '2018.05.29',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '170.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208630671',
    ENAR: 'HU3208652358',
    'Születési dátum': '2018.06.22',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '150.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208630981',
    ENAR: 'HU3208651759',
    'Születési dátum': '2018.04.20',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '154.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208613968',
    ENAR: 'HU3394802397',
    'Születési dátum': '2018.04.24',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '150.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208618468',
    ENAR: 'HU3208652017',
    'Születési dátum': '2018.05.03',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '149.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208618716',
    ENAR: 'HU3208652341',
    'Születési dátum': '2018.06.16',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '157.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208616967',
    ENAR: 'HU3394802847',
    'Születési dátum': '2018.06.09',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '148.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208613999',
    ENAR: 'HU3394802917',
    'Születési dátum': '2018.06.19',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '186.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3281709916',
    ENAR: 'HU3394802506',
    'Születési dátum': '2018.05.03',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vöröstarka',
    'Valasztasi suly': '130.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208613470',
    ENAR: 'HU3394802809',
    'Születési dátum': '2018.06.02',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '141.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208642049',
    ENAR: 'HU3394802359',
    'Születési dátum': '2018.04.22',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '133.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208616688',
    ENAR: 'HU3394802948',
    'Születési dátum': '2018.06.24',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '110.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208611683',
    ENAR: 'HU3394802683',
    'Születési dátum': '2018.05.14',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '135.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208642296',
    ENAR: 'HU3394802436',
    'Születési dátum': '2018.04.25',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '126.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208620540',
    ENAR: 'HU3208651975',
    'Születési dátum': '2018.04.30',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '120.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3251701672',
    ENAR: 'HU3394802760',
    'Születési dátum': '2018.05.23',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '100.0',
    'gy/nap/g': ''
  },
  {
    'Anyja Enar': 'HU3208608856',
    ENAR: 'HU3394802607',
    'Születési dátum': '2018.05.10',
    Neme: 'hímivarú',
    Fajta: 'limousin',
    Szin: 'vörös',
    'Valasztasi suly': '98.0',
    'gy/nap/g': ''
  }
];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  animations: [shiftAnimation, appearAnimation]
})
export class TestComponent implements OnInit {
  @ViewChild(HubTableComponent) hubTable: HubTableComponent;
  @ViewChild('presetSelector') presetSelector: MatSelect;
  @ViewChildren('removableOptions') removableOptions: QueryList<
    RemovableOptionComponent
  >;

  tableFilters: Preset = new Preset();
  selectedPreset: KeyValue<string, Preset>;

  filterPresets: Map<string, Preset> = new Map();
  filterValues: Map<string, string[]> = new Map();
  filtersFormGroup: FormGroup;

  get data() {
    return TestData;
  }

  get filterNames(): string[] {
    return Object.keys(this.filtersFormGroup.controls);
  }

  // region Init
  constructor(private fb: FormBuilder) {
    this.filtersFormGroup = fb.group({
      Fajta: '',
      Szin: '',
      Neme: ''
    });
  }

  ngOnInit(): void {
    this.restorePresets();
  }

  // create unique list of values for specific filter and cache it inside a map
  createFilterValues(dataSourceElement: any[], columnName: string): string[] {
    if (!this.filterValues.get(columnName)) {
      // cache the filter values
      this.filterValues.set(
        columnName,
        dataSourceElement
          .map(row => row[columnName])
          .filter((value, index, self) => self.indexOf(value) === index)
      );
    }

    return this.filterValues.get(columnName);
  }
  // endregion

  // region Modify filters
  public resetFilters() {
    // reset the formGroup
    this.filtersFormGroup.reset();
    // reset the filtersFormGroup object to a new object
    this.tableFilters = new Preset();
    // apply the new now reset filtersFormGroup to the table
    this.hubTable.applyFilter(this.tableFilters);
  }

  public changeFilters() {
    // reset form in case not every filter is used
    this.filtersFormGroup.reset();
    // apply the filter
    this.tableFilters = new Preset(this.selectedPreset.value);

    // copy the values into the formGroup
    Object.keys(this.tableFilters.filters).forEach(key =>
      this.filtersFormGroup.get(key).setValue(this.tableFilters.filters[key])
    );

    // apply the filter to the table
    this.hubTable.applyFilter(this.tableFilters);
  }

  public applyFilter(columnName: string) {
    // set the chosen filter
    this.tableFilters.filters[columnName] = this.filtersFormGroup.get(
      columnName
    ).value;
    // apply the filter to the table
    this.hubTable.applyFilter(this.tableFilters);
  }
  // endregion

  // region Save, select, store and restore presets
  // select a preset filter
  private usePreset(event: MatSelectChange) {
    if (event.value) {
      // if a preset is chosen, apply it
      this.changeFilters();
    } else {
      // else reset the filtersFormGroup
      this.resetFilters();
    }
  }

  // save the current filter into a preset for later use
  public savePreset() {
    const copiedPreset: Preset = JSON.parse(JSON.stringify(this.tableFilters));
    copiedPreset.headers = JSON.parse(JSON.stringify(this.hubTable.headers));
    // copiedPreset.sort = this.hubTable.sort.;
    copiedPreset.pageSize = this.hubTable.paginator.pageSize;
    copiedPreset.sort = {
      direction: this.hubTable.sort.direction,
      active: this.hubTable.sort.active
    };

    // save the filter into presets
    this.filterPresets.set(this.tableFilters.name, copiedPreset);
    // store the presets
    this.storePresets();
  }

  // store the presets
  private storePresets() {
    // convert the map into a list of objects and save it to localstorage
    localStorage.setItem(
      'test_table_presets',
      JSON.stringify(
        Array.from(this.filterPresets, ([key, value]) => {
          return {name: key, value: value};
        })
      )
    );
  }

  private restorePresets() {
    // load serialized map from localstorage
    const presets: object[] = JSON.parse(
      localStorage.getItem('test_table_presets')
    );

    // fill presets map from serialized object
    if (presets) {
      presets.forEach((preset: {name: string; value: Preset}) =>
        this.filterPresets.set(preset.name, preset.value)
      );
    }
  }

  // endregion

  presetDeleteConfirmationRequested(optionKey: string) {
    this.removableOptions.forEach(ro => ro.resetPermission(optionKey));
  }

  deletePreset(presetKey: string) {
    this.filterPresets.delete(presetKey);
    this.storePresets();
  }

  presetSelectorOpened() {
    this.removableOptions.forEach(ro => ro.resetPermission());
  }
}

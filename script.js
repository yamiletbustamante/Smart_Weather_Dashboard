'use strict';

const OWM_KEY = '0a36f420820f0d094a1c0a699b94d8ab';
const PEXELS_KEY = 'YmfhQWmJFAxFVDkemGOfVB5vm7bsOd3hbzgFlpEYkbQrNI0UEkdBd9nz';

const OWM_BASE = 'https://api.openweathermap.org/data/2.5';
const OM_BASE = 'https://api.open-meteo.com/v1/forecast';
const PEXELS_BASE = 'https://api.pexels.com/v1';

const HISTORY_KEY = 'swd_v12_history';
const IMG_CACHE_KEY = 'swd_v12_imgCache';
const MAX_HIST = 8;
const IMG_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 días
const IMG_TIMEOUT = 9000;

// ════════════════════════════════════════════════
// 🎨 FONDOS SVG TEMÁTICOS — aplicados al instante
// ════════════════════════════════════════════════
const SVG_BACKGROUNDS = {

    night: `
    <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs>
        <radialGradient id='sky' cx='50%' cy='0%' r='100%'>
          <stop offset='0%' stop-color='%230d1b3e'/>
          <stop offset='100%' stop-color='%23010814'/>
        </radialGradient>
      </defs>
      <rect width='1600' height='900' fill='url(%23sky)'/>
      <circle cx='62' cy='18' r='1.2' fill='white' opacity='.7'/>
      <circle cx='138' cy='45' r='.8' fill='white' opacity='.5'/>
      <circle cx='210' cy='22' r='1.1' fill='white' opacity='.8'/>
      <circle cx='310' cy='55' r='.7' fill='white' opacity='.4'/>
      <circle cx='390' cy='30' r='1.3' fill='white' opacity='.7'/>
      <circle cx='460' cy='68' r='.9' fill='white' opacity='.6'/>
      <circle cx='540' cy='15' r='1.0' fill='white' opacity='.8'/>
      <circle cx='620' cy='42' r='.6' fill='white' opacity='.5'/>
      <circle cx='700' cy='28' r='1.2' fill='white' opacity='.7'/>
      <circle cx='780' cy='60' r='.8' fill='white' opacity='.4'/>
      <circle cx='860' cy='18' r='1.0' fill='white' opacity='.6'/>
      <circle cx='940' cy='50' r='.7' fill='white' opacity='.8'/>
      <circle cx='1020' cy='35' r='1.1' fill='white' opacity='.5'/>
      <circle cx='1100' cy='72' r='.9' fill='white' opacity='.7'/>
      <circle cx='1180' cy='20' r='1.3' fill='white' opacity='.6'/>
      <circle cx='1260' cy='48' r='.8' fill='white' opacity='.4'/>
      <circle cx='1340' cy='25' r='1.0' fill='white' opacity='.8'/>
      <circle cx='1420' cy='58' r='.6' fill='white' opacity='.5'/>
      <circle cx='1500' cy='32' r='1.2' fill='white' opacity='.7'/>
      <circle cx='1570' cy='65' r='.9' fill='white' opacity='.6'/>
      <circle cx='250' cy='85' r='.8' fill='white' opacity='.8'/>
      <circle cx='430' cy='95' r='.6' fill='white' opacity='.7'/>
      <circle cx='670' cy='125' r='.7' fill='white' opacity='.8'/>
      <circle cx='910' cy='92' r='1.0' fill='white' opacity='.5'/>
      <circle cx='1230' cy='82' r='.9' fill='white' opacity='.7'/>
      <circle cx='1200' cy='160' r='52' fill='%23fffbe6' opacity='.92'/>
      <circle cx='1225' cy='148' r='44' fill='%230d1b3e' opacity='.9'/>
      <rect x='0'    y='500' width='90'  height='400' fill='%230a1428'/>
      <rect x='80'   y='420' width='110' height='480' fill='%230c1830'/>
      <rect x='240'  y='380' width='130' height='520' fill='%230e1e38'/>
      <rect x='430'  y='350' width='150' height='550' fill='%230c1830'/>
      <rect x='630'  y='400' width='120' height='500' fill='%230e1e38'/>
      <rect x='740'  y='360' width='160' height='540' fill='%230c1830'/>
      <rect x='970'  y='390' width='140' height='510' fill='%230e1e38'/>
      <rect x='1170' y='370' width='130' height='530' fill='%230c1830'/>
      <rect x='1380' y='400' width='220' height='500' fill='%230e1e38'/>
      <rect x='30'   y='430' width='12' height='8' fill='%23ffd070' opacity='.8' rx='1'/>
      <rect x='110'  y='440' width='12' height='8' fill='%23ffd070' opacity='.8' rx='1'/>
      <rect x='260'  y='400' width='12' height='8' fill='%23ffd070' opacity='.8' rx='1'/>
      <rect x='450'  y='370' width='12' height='8' fill='%23ffd070' opacity='.8' rx='1'/>
      <rect x='660'  y='420' width='12' height='8' fill='%23ffd070' opacity='.7' rx='1'/>
      <rect x='760'  y='380' width='12' height='8' fill='%23ffd070' opacity='.8' rx='1'/>
      <rect x='990'  y='410' width='12' height='8' fill='%23ffd070' opacity='.8' rx='1'/>
      <rect x='1185' y='390' width='12' height='8' fill='%237ecfff' opacity='.7' rx='1'/>
      <rect x='1400' y='420' width='12' height='8' fill='%237ecfff' opacity='.7' rx='1'/>
      <rect x='0' y='820' width='1600' height='80' fill='%2305080f'/>
    </svg>`,

    thunder: `
    <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs>
        <radialGradient id='sg' cx='50%' cy='30%' r='70%'>
          <stop offset='0%' stop-color='%231a0a2e'/>
          <stop offset='100%' stop-color='%2306030e'/>
        </radialGradient>
      </defs>
      <rect width='1600' height='900' fill='url(%23sg)'/>
      <ellipse cx='300' cy='180' rx='320' ry='140' fill='%231c1028' opacity='.95'/>
      <ellipse cx='600' cy='140' rx='380' ry='160' fill='%2322122e' opacity='.95'/>
      <ellipse cx='950' cy='160' rx='350' ry='150' fill='%231a0e26' opacity='.95'/>
      <ellipse cx='1280' cy='190' rx='360' ry='145' fill='%23200f2c' opacity='.95'/>
      <polyline points='760,80 720,280 760,280 700,520 740,520 670,720' stroke='%23f0e8ff' stroke-width='5' fill='none' opacity='.95'/>
      <polyline points='760,80 720,280 760,280 700,520 740,520 670,720' stroke='white' stroke-width='2' fill='none' opacity='.85'/>
      <ellipse cx='720' cy='400' rx='80' ry='320' fill='%23a080ff' opacity='.07'/>
      <polyline points='1100,120 1070,300 1100,300 1050,460' stroke='%23c0b8ff' stroke-width='3' fill='none' opacity='.7'/>
      <line x1='100' y1='0' x2='88' y2='30' stroke='%238ab4d0' stroke-width='1' opacity='.35'/>
      <line x1='260' y1='10' x2='248' y2='40' stroke='%238ab4d0' stroke-width='1' opacity='.35'/>
      <line x1='420' y1='20' x2='408' y2='50' stroke='%238ab4d0' stroke-width='1' opacity='.35'/>
      <line x1='580' y1='30' x2='568' y2='60' stroke='%238ab4d0' stroke-width='1' opacity='.35'/>
      <line x1='900' y1='0' x2='888' y2='30' stroke='%238ab4d0' stroke-width='1' opacity='.35'/>
      <line x1='1060' y1='15' x2='1048' y2='45' stroke='%238ab4d0' stroke-width='1' opacity='.35'/>
      <line x1='1220' y1='25' x2='1208' y2='55' stroke='%238ab4d0' stroke-width='1' opacity='.35'/>
      <line x1='1380' y1='35' x2='1368' y2='65' stroke='%238ab4d0' stroke-width='1' opacity='.35'/>
      <rect x='0' y='800' width='1600' height='100' fill='%23030208'/>
      <ellipse cx='720' cy='820' rx='140' ry='15' fill='%238060ff' opacity='.18'/>
    </svg>`,

    rain: `
    <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs>
        <linearGradient id='rg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='%230d1e30'/>
          <stop offset='100%' stop-color='%23060d16'/>
        </linearGradient>
      </defs>
      <rect width='1600' height='900' fill='url(%23rg)'/>
      <ellipse cx='200' cy='120' rx='280' ry='100' fill='%231a2a3a' opacity='.9'/>
      <ellipse cx='550' cy='100' rx='340' ry='110' fill='%231e3040' opacity='.9'/>
      <ellipse cx='950' cy='110' rx='320' ry='105' fill='%231a2a3a' opacity='.9'/>
      <ellipse cx='1350' cy='120' rx='310' ry='100' fill='%231e3040' opacity='.9'/>
      <rect x='0'    y='380' width='100' height='520' fill='%230a1520' opacity='.9'/>
      <rect x='90'   y='320' width='130' height='580' fill='%230c1828' opacity='.9'/>
      <rect x='290'  y='350' width='150' height='550' fill='%230e1e30' opacity='.9'/>
      <rect x='800'  y='360' width='170' height='540' fill='%230c1828' opacity='.9'/>
      <rect x='1070' y='340' width='200' height='560' fill='%230e1e30' opacity='.9'/>
      <rect x='1390' y='380' width='210' height='520' fill='%230c1828' opacity='.9'/>
      <rect x='20'  y='340' width='14' height='10' fill='%23ffcc66' opacity='.7' rx='1'/>
      <rect x='310' y='370' width='14' height='10' fill='%23ffcc66' opacity='.7' rx='1'/>
      <rect x='820' y='380' width='14' height='10' fill='%23ffcc66' opacity='.7' rx='1'/>
      <rect x='1090' y='360' width='14' height='10' fill='%23ffcc66' opacity='.7' rx='1'/>
      <rect x='0' y='720' width='1600' height='180' fill='%230a1520'/>
      <ellipse cx='300' cy='760' rx='180' ry='18' fill='%232a5080' opacity='.4'/>
      <ellipse cx='750' cy='770' rx='220' ry='20' fill='%231e4060' opacity='.35'/>
      <ellipse cx='1200' cy='755' rx='190' ry='17' fill='%232a5080' opacity='.4'/>
      <line x1='80'  y1='0'  x2='68'  y2='35' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='240' y1='10' x2='228' y2='45' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='400' y1='20' x2='388' y2='55' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='560' y1='30' x2='548' y2='65' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='720' y1='40' x2='708' y2='75' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='880' y1='50' x2='868' y2='85' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='1040' y1='60' x2='1028' y2='95' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='1200' y1='70' x2='1188' y2='105' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='1360' y1='80' x2='1348' y2='115' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
      <line x1='1520' y1='90' x2='1508' y2='125' stroke='%2390b8d0' stroke-width='.8' opacity='.3'/>
    </svg>`,

    snow: `
    <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs>
        <linearGradient id='ss' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='%231a2540'/>
          <stop offset='100%' stop-color='%233a4a6a'/>
        </linearGradient>
      </defs>
      <rect width='1600' height='900' fill='url(%23ss)'/>
      <ellipse cx='300'  cy='150' rx='300' ry='110' fill='%23c8d4e8' opacity='.6'/>
      <ellipse cx='700'  cy='130' rx='360' ry='120' fill='%23d0daf0' opacity='.6'/>
      <ellipse cx='1100' cy='145' rx='340' ry='115' fill='%23c8d4e8' opacity='.6'/>
      <polygon points='0,700 200,380 400,700'    fill='%231e2c44' opacity='.9'/>
      <polygon points='150,700 400,350 650,700'  fill='%23243246' opacity='.9'/>
      <polygon points='400,700 680,400 900,700'  fill='%231e2c44' opacity='.9'/>
      <polygon points='700,700 1000,370 1250,700' fill='%23243246' opacity='.9'/>
      <polygon points='1050,700 1300,390 1550,700' fill='%231e2c44' opacity='.9'/>
      <polygon points='200,380 170,440 240,440' fill='%23d8e8f8' opacity='.85'/>
      <polygon points='400,350 365,425 445,425' fill='%23dceefa' opacity='.85'/>
      <polygon points='680,400 645,468 722,468' fill='%23d8e8f8' opacity='.85'/>
      <polygon points='1000,370 963,448 1045,448' fill='%23dceefa' opacity='.85'/>
      <rect x='0' y='700' width='1600' height='200' fill='%23c8d8ec'/>
      <circle cx='80'   cy='100' r='3' fill='white' opacity='.7'/>
      <circle cx='320'  cy='140' r='3' fill='white' opacity='.8'/>
      <circle cx='560'  cy='120' r='3' fill='white' opacity='.7'/>
      <circle cx='800'  cy='130' r='3' fill='white' opacity='.8'/>
      <circle cx='1040' cy='110' r='3' fill='white' opacity='.7'/>
      <circle cx='1280' cy='125' r='3' fill='white' opacity='.8'/>
      <circle cx='280'  cy='300' r='3' fill='white' opacity='.7'/>
      <circle cx='560'  cy='280' r='3' fill='white' opacity='.8'/>
      <circle cx='840'  cy='270' r='3' fill='white' opacity='.7'/>
      <circle cx='1120' cy='290' r='3' fill='white' opacity='.8'/>
      <circle cx='1400' cy='310' r='3' fill='white' opacity='.7'/>
    </svg>`,

    fog: `
    <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs>
        <linearGradient id='fg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='%231a1e24'/>
          <stop offset='100%' stop-color='%232a3038'/>
        </linearGradient>
      </defs>
      <rect width='1600' height='900' fill='url(%23fg)'/>
      <rect x='100'  y='360' width='120' height='540' fill='%231e2430' opacity='.3'/>
      <rect x='380'  y='320' width='160' height='580' fill='%23202838' opacity='.25'/>
      <rect x='700'  y='340' width='140' height='560' fill='%231e2430' opacity='.22'/>
      <rect x='1000' y='310' width='180' height='590' fill='%23202838' opacity='.25'/>
      <rect x='1300' y='360' width='130' height='540' fill='%231e2430' opacity='.28'/>
      <rect x='0' y='320' width='1600' height='80'  fill='%23c8ccd4' opacity='.14'/>
      <rect x='0' y='380' width='1600' height='90'  fill='%23d0d4dc' opacity='.18'/>
      <rect x='0' y='450' width='1600' height='100' fill='%23c0c4cc' opacity='.20'/>
      <rect x='0' y='530' width='1600' height='90'  fill='%23d0d4dc' opacity='.22'/>
      <rect x='0' y='600' width='1600' height='110' fill='%23c8ccd4' opacity='.25'/>
      <rect x='0' y='680' width='1600' height='130' fill='%23d8dce4' opacity='.30'/>
      <rect x='0' y='760' width='1600' height='140' fill='%23dce0e8' opacity='.35'/>
      <ellipse cx='500'  cy='580' rx='90' ry='90' fill='%23ffd080' opacity='.06'/>
      <ellipse cx='1100' cy='560' rx='80' ry='80' fill='%23ffd080' opacity='.05'/>
      <rect x='0' y='800' width='1600' height='100' fill='%23c0c8d4' opacity='.2'/>
    </svg>`,

    clear: `
    <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs>
        <linearGradient id='csk' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='%230a3a6e'/>
          <stop offset='50%' stop-color='%231a6ab0'/>
          <stop offset='100%' stop-color='%234a9ad4'/>
        </linearGradient>
        <linearGradient id='gnd' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='%232a7a30'/>
          <stop offset='100%' stop-color='%231a5020'/>
        </linearGradient>
      </defs>
      <rect width='1600' height='900' fill='url(%23csk)'/>
      <circle cx='1152' cy='180' r='180' fill='%23ffd040' opacity='.12'/>
      <circle cx='1152' cy='180' r='120' fill='%23ffe060' opacity='.18'/>
      <circle cx='1152' cy='180' r='62' fill='%23fff8c0' opacity='.97'/>
      <circle cx='1152' cy='180' r='52' fill='%23fff5a0'/>
      <line x1='1152' y1='102' x2='1152' y2='80'  stroke='%23ffe870' stroke-width='3' opacity='.7' stroke-linecap='round'/>
      <line x1='1207' y1='118' x2='1222' y2='100' stroke='%23ffe870' stroke-width='3' opacity='.7' stroke-linecap='round'/>
      <line x1='1235' y1='170' x2='1257' y2='165' stroke='%23ffe870' stroke-width='3' opacity='.7' stroke-linecap='round'/>
      <line x1='1220' y1='228' x2='1238' y2='244' stroke='%23ffe870' stroke-width='3' opacity='.7' stroke-linecap='round'/>
      <line x1='1068' y1='190' x2='1046' y2='185' stroke='%23ffe870' stroke-width='3' opacity='.7' stroke-linecap='round'/>
      <line x1='1082' y1='132' x2='1064' y2='115' stroke='%23ffe870' stroke-width='3' opacity='.7' stroke-linecap='round'/>
      <ellipse cx='200' cy='220' rx='160' ry='55' fill='white' opacity='.85'/>
      <ellipse cx='280' cy='200' rx='120' ry='50' fill='white' opacity='.85'/>
      <ellipse cx='650' cy='180' rx='140' ry='48' fill='white' opacity='.75'/>
      <ellipse cx='720' cy='165' rx='110' ry='44' fill='white' opacity='.75'/>
      <rect x='0' y='720' width='1600' height='180' fill='url(%23gnd)'/>
      <ellipse cx='800' cy='730' rx='600' ry='30' fill='%23ffe840' opacity='.07'/>
    </svg>`,

    clouds: `
    <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <defs>
        <linearGradient id='clg' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='%231a1e28'/>
          <stop offset='100%' stop-color='%23252a36'/>
        </linearGradient>
      </defs>
      <rect width='1600' height='900' fill='url(%23clg)'/>
      <ellipse cx='200'  cy='120' rx='320' ry='110' fill='%233a4050' opacity='.8'/>
      <ellipse cx='580'  cy='100' rx='380' ry='120' fill='%23404858' opacity='.8'/>
      <ellipse cx='980'  cy='110' rx='360' ry='115' fill='%23383e4e' opacity='.8'/>
      <ellipse cx='1380' cy='125' rx='340' ry='108' fill='%23404858' opacity='.8'/>
      <ellipse cx='500'  cy='200' rx='340' ry='100' fill='%23384050' opacity='.75'/>
      <ellipse cx='880'  cy='210' rx='360' ry='105' fill='%2330384a' opacity='.75'/>
      <rect x='0'    y='480' width='110' height='420' fill='%231a1e28' opacity='.9'/>
      <rect x='100'  y='420' width='140' height='480' fill='%231e2430' opacity='.9'/>
      <rect x='315'  y='400' width='160' height='500' fill='%231e2430' opacity='.9'/>
      <rect x='570'  y='390' width='175' height='510' fill='%231e2430' opacity='.9'/>
      <rect x='820'  y='410' width='155' height='490' fill='%231e2430' opacity='.9'/>
      <rect x='1060' y='395' width='170' height='505' fill='%231e2430' opacity='.9'/>
      <rect x='1325' y='415' width='145' height='485' fill='%231e2430' opacity='.9'/>
      <rect x='30'  y='440' width='12' height='8' fill='%236080a0' opacity='.4' rx='1'/>
      <rect x='330' y='420' width='12' height='8' fill='%236080a0' opacity='.35' rx='1'/>
      <rect x='590' y='410' width='12' height='8' fill='%236080a0' opacity='.35' rx='1'/>
      <rect x='835' y='430' width='12' height='8' fill='%236080a0' opacity='.35' rx='1'/>
      <rect x='1075' y='415' width='12' height='8' fill='%236080a0' opacity='.35' rx='1'/>
      <rect x='1340' y='435' width='12' height='8' fill='%236080a0' opacity='.35' rx='1'/>
      <rect x='0' y='820' width='1600' height='80' fill='%2312151e'/>
    </svg>`,
};

function svgToDataUrl(svgStr) {
    const clean = svgStr.trim().replace(/\n\s+/g, ' ');
    try {
        return 'data:image/svg+xml;base64,' + btoa(clean);
    } catch {
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(clean);
    }
}

function getThemeSVGUrl(weatherId, isNight) {
    let key;
    if (isNight) key = 'night';
    else if (weatherId >= 200 && weatherId < 300) key = 'thunder';
    else if (weatherId >= 300 && weatherId < 600) key = 'rain';
    else if (weatherId >= 600 && weatherId < 700) key = 'snow';
    else if (weatherId >= 700 && weatherId < 800) key = 'fog';
    else if (weatherId === 800) key = 'clear';
    else key = 'clouds';
    return svgToDataUrl(SVG_BACKGROUNDS[key]);
}

// ── DOM ─────────────────────────────────────────
const $ = id => document.getElementById(id);
const dom = {
    loader: $('loader'), cityBgImg: $('cityBgImg'),
    heroInfo: $('heroInfo'), bottomPanel: $('bottomPanel'),
    cityInput: $('cityInput'), geoBtn: $('geoBtn'),
    historyChips: $('historyChips'), sugBox: $('suggestionsBox'),
    errorBar: $('errorBar'), errorText: $('errorText'),
    changeCityBtn: $('changeCityBtn'), addCityBtn: $('addCityBtn'),
    toast: $('toast'), tempBig: $('tempBig'),
    condIcon: $('condIcon'), condText: $('condText'),
    cityTitle: $('cityTitle'), citySub: $('citySub'),
    clockBig: $('clockBig'), dateStr: $('dateStr'),
    stHumidity: $('stHumidity'), stPressure: $('stPressure'),
    stVisibility: $('stVisibility'), stWind: $('stWind'),
    stUV: $('stUV'), stDew: $('stDew'),
    pMorning: $('pMorning'), pAfternoon: $('pAfternoon'), pEvening: $('pEvening'),
    sunRise: $('sunRise'), sunSet: $('sunSet'),
    hourlyRow: $('hourlyRow'), dailyList: $('dailyList'),
};

let state = {
    unit: 'C', timezone: 'local', loading: false,
    lastData: null, currentCity: '', isFromGeo: false,
};
let sugIndex = -1;

// ════════════════════════════════════════════════
// CACHÉ DE IMÁGENES
// ════════════════════════════════════════════════
function getImgCache() {
    try { return JSON.parse(localStorage.getItem(IMG_CACHE_KEY)) || {}; } catch { return {}; }
}
function setImgCache(k, url) {
    try {
        const c = getImgCache();
        c[k] = { url, time: Date.now() };
        localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(c));
    } catch { }
}
function getFromImgCache(k) {
    const c = getImgCache(), e = c[k];
    return (e && Date.now() - e.time < IMG_CACHE_TTL) ? e.url : null;
}

// ════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════
function init() {
    bindEvents(); bindSuggestions(); renderHistory(); startClock(); hideLoader(); preloadOWMIcons();
    const hist = getHistory();
    if (hist.length) searchCity(hist[0].name);
}

function preloadOWMIcons() {
    ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n',
        '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n']
        .forEach(c => { const i = new Image(); i.src = `https://openweathermap.org/img/wn/${c}@2x.png`; });
}

// ════════════════════════════════════════════════
// EVENTOS
// ════════════════════════════════════════════════
function bindEvents() {
    dom.cityInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const items = dom.sugBox.querySelectorAll('.suggestion-item');
            if (sugIndex >= 0 && items[sugIndex]) {
                const el = items[sugIndex];
                searchByCoords(+el.dataset.lat, +el.dataset.lon, el.dataset.name, el.dataset.city, el.dataset.state || '');
                hideSuggestions(); dom.cityInput.value = '';
            } else {
                triggerSearch();
            }
        } else if (e.key === 'ArrowDown') { e.preventDefault(); moveSuggestion(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); moveSuggestion(-1); }
        else if (e.key === 'Escape') { hideSuggestions(); dom.cityInput.blur(); }
    });
    dom.geoBtn.addEventListener('click', geoSearch);
    dom.changeCityBtn.addEventListener('click', () => { dom.cityInput.focus(); dom.cityInput.select(); });
    dom.addCityBtn.addEventListener('click', saveCurrentCity);
    $('btnC').addEventListener('click', () => setUnit('C'));
    $('btnF').addEventListener('click', () => setUnit('F'));
    document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        $(`pane-${btn.dataset.tab}`).classList.add('active');
    }));
    document.querySelectorAll('.tz-btn').forEach(btn => btn.addEventListener('click', () => {
        document.querySelectorAll('.tz-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.timezone = btn.dataset.tz || 'local';
        updateClock();
    }));
    document.addEventListener('click', e => {
        if (!e.target.closest('.search-wrap')) hideSuggestions();
    });
}

// ════════════════════════════════════════════════
// SUGERENCIAS NOMINATIM
// ════════════════════════════════════════════════
function bindSuggestions() {
    dom.cityInput.addEventListener('input', debounce(async e => {
        const q = e.target.value.trim();
        if (q.length < 2) { hideSuggestions(); return; }
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=10&addressdetails=1&accept-language=es`,
                { headers: { 'User-Agent': 'SmartWeatherDashboard/1.0' } }
            );
            if (!res.ok) return;
            const all = await res.json();

            // Deduplicar: mismo nombre + país → queda solo el primero
            const seen = new Set();
            const unique = all.filter(p => {
                const a = p.address;
                const name = a.neighbourhood || a.suburb || a.quarter || a.city_district ||
                    a.borough || a.town || a.city || a.village ||
                    a.municipality || a.county || p.display_name.split(',')[0];
                const key = `${name}__${a.country_code}`.toLowerCase();
                if (seen.has(key)) return false;
                seen.add(key); return true;
            }).slice(0, 7);

            renderNominatimSuggestions(unique);
        } catch { }
    }, 350));
}

function renderNominatimSuggestions(places) {
    if (!places?.length) { hideSuggestions(); return; }
    sugIndex = -1;
    dom.sugBox.innerHTML = places.map((p) => {
        const a = p.address;
        const shortName = a.neighbourhood || a.suburb || a.quarter || a.city_district ||
            a.borough || a.town || a.city || a.village ||
            a.municipality || a.county || p.display_name.split(',')[0];
        const parentCity = a.city || a.town || a.village || a.county || '';
        const context = [
            parentCity !== shortName ? parentCity : '',
            a.state,
            a.country_code?.toUpperCase()
        ].filter(Boolean).join(', ');
        const typeIcon = (p.type === 'administrative' || p.type === 'city')
            ? `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`
            : `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`;
        return `<div class="suggestion-item"
        data-lat="${p.lat}" data-lon="${p.lon}"
        data-name="${safe(shortName)}" data-city="${safe(parentCity || shortName)}"
        data-state="${safe(a.state || '')}">
      <svg class="sug-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${typeIcon}</svg>
      <span class="sug-name">${shortName}</span>
      <span class="sug-meta">${context}</span>
    </div>`;
    }).join('');

    dom.sugBox.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('mousedown', e => {
            e.preventDefault();
            searchByCoords(+item.dataset.lat, +item.dataset.lon, item.dataset.name, item.dataset.city, item.dataset.state || '');
            hideSuggestions(); dom.cityInput.value = '';
        });
    });
    dom.sugBox.classList.add('show');
}

function safe(s) { return (s || '').replace(/"/g, '&quot;'); }
function moveSuggestion(dir) {
    const items = dom.sugBox.querySelectorAll('.suggestion-item');
    if (!items.length) return;
    sugIndex = Math.max(-1, Math.min(items.length - 1, sugIndex + dir));
    items.forEach((el, i) => el.classList.toggle('active', i === sugIndex));
}
function hideSuggestions() { dom.sugBox.classList.remove('show'); dom.sugBox.innerHTML = ''; sugIndex = -1; }

// ════════════════════════════════════════════════
// BÚSQUEDA
// ════════════════════════════════════════════════
function triggerSearch() {
    const city = dom.cityInput.value.trim();
    if (!city) { shakeBar(); return; }
    searchCity(city); hideSuggestions();
}

async function searchCity(city) {
    if (state.loading) return;
    hideError(); showLoader();
    try {
        const current = await owmFetch(`${OWM_BASE}/weather?q=${encodeURIComponent(city)}&units=metric&lang=es&appid=${OWM_KEY}`);
        const omData = await fetchOpenMeteo(current.coord.lat, current.coord.lon);
        state.lastData = { current, omData, displayName: current.name, cityName: current.name };
        state.currentCity = current.name; state.isFromGeo = false;
        render(current, omData, current.name, current.name);
        dom.cityInput.value = '';
    } catch (err) { handleError(err); }
    finally { hideLoader(); }
}

async function searchByCoords(lat, lon, displayName, cityName, stateName = '') {
    if (state.loading) return;
    hideError(); showLoader();
    try {
        const [current, omData] = await Promise.all([
            owmFetch(`${OWM_BASE}/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${OWM_KEY}`),
            fetchOpenMeteo(lat, lon),
        ]);
        const resolvedCity = current.name || cityName;
        state.lastData = { current, omData, displayName, cityName: resolvedCity, stateName };
        state.currentCity = displayName; state.isFromGeo = false;
        render(current, omData, displayName, resolvedCity, stateName);
    } catch (err) { handleError(err); }
    finally { hideLoader(); }
}

async function geoSearch() {
    if (!navigator.geolocation) { showError('Geolocalización no disponible'); return; }
    showLoader(); hideError();
    navigator.geolocation.getCurrentPosition(async pos => {
        const { latitude: lat, longitude: lon } = pos.coords;
        try {
            const [current, omData] = await Promise.all([
                owmFetch(`${OWM_BASE}/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${OWM_KEY}`),
                fetchOpenMeteo(lat, lon),
            ]);
            state.lastData = { current, omData, displayName: current.name, cityName: current.name };
            state.currentCity = current.name; state.isFromGeo = true;
            render(current, omData, current.name, current.name);
        } catch (err) { handleError(err); }
        finally { hideLoader(); }
    }, () => { hideLoader(); showError('No se pudo obtener la ubicación'); });
}

async function owmFetch(url) {
    const res = await fetch(url);
    if (!res.ok) { const d = await res.json().catch(() => ({})); throw { status: res.status, msg: d.message || 'Error' }; }
    return res.json();
}

// ════════════════════════════════════════════════
// OPEN-METEO
// ════════════════════════════════════════════════
async function fetchOpenMeteo(lat, lon) {
    const url = `${OM_BASE}?latitude=${lat}&longitude=${lon}` +
        `&hourly=temperature_2m,weathercode,relative_humidity_2m` +
        `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max` +
        `&timezone=auto&forecast_days=7`;
    const res = await fetch(url);
    if (!res.ok) throw { status: res.status, msg: 'Open-Meteo error' };
    return res.json();
}

function wmoInfo(code, isNight = false) {
    const n = isNight ? 'n' : 'd';
    if (code === 0) return { icon: `01${n}`, desc: 'Cielo despejado' };
    if (code <= 2) return { icon: `02${n}`, desc: 'Parcialmente nublado' };
    if (code === 3) return { icon: `04${n}`, desc: 'Nublado' };
    if (code <= 48) return { icon: `50${n}`, desc: 'Niebla' };
    if (code <= 55) return { icon: `09${n}`, desc: 'Llovizna' };
    if (code <= 65) return { icon: `10${n}`, desc: 'Lluvia' };
    if (code <= 75) return { icon: `13${n}`, desc: 'Nieve' };
    if (code <= 82) return { icon: `09${n}`, desc: 'Lluvia intensa' };
    if (code <= 86) return { icon: `13${n}`, desc: 'Nevada' };
    if (code <= 99) return { icon: `11${n}`, desc: 'Tormenta' };
    return { icon: `03${n}`, desc: 'Nublado' };
}

// ════════════════════════════════════════════════
// RENDER
// ════════════════════════════════════════════════
function render(current, omData, displayName, cityName, stateName = '') {
    const isNight = current.weather[0].icon.endsWith('n');

    // Pasa nombre del barrio, ciudad padre y estado/región para fallback de imagen
    setCityBackground(displayName, cityName, stateName, current.weather[0].id, current.weather[0].icon);

    dom.tempBig.textContent = toUnit(current.main.temp);
    dom.condIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    dom.condIcon.alt = current.weather[0].description;
    dom.condText.textContent = capitalize(current.weather[0].description);
    dom.cityTitle.textContent = displayName || current.name;
    dom.citySub.textContent = current.sys.country;

    dom.stHumidity.textContent = `${current.main.humidity}%`;
    dom.stPressure.textContent = `${current.main.pressure} mb`;
    dom.stVisibility.textContent = current.visibility >= 10000
        ? 'Ilimitada' : `${(current.visibility / 1000).toFixed(1)} km`;
    dom.stWind.textContent = `${Math.round(current.wind.speed * 3.6)} km/h`;
    dom.stUV.textContent = '-- de 10';
    const dew = Math.round(current.main.temp - ((100 - current.main.humidity) / 5));
    dom.stDew.textContent = `${toUnit(dew)}°`;

    dom.sunRise.textContent = utcTime(current.sys.sunrise, current.timezone);
    dom.sunSet.textContent = utcTime(current.sys.sunset, current.timezone);

    renderPeriods(omData);
    renderHourly(omData);
    renderDaily(omData);

    dom.addCityBtn.innerHTML = state.isFromGeo
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 5v14M5 12h14"/></svg>Guardar ubicación'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 5v14M5 12h14"/></svg>Guardar ciudad';

    dom.heroInfo.classList.add('visible');
    dom.bottomPanel.classList.add('visible');
}

// ════════════════════════════════════════════════
// PERIODOS DEL DÍA
// ════════════════════════════════════════════════
function renderPeriods(omData) {
    const todayStr = new Date().toDateString();
    const manana = [], tarde = [], noche = [];
    omData.hourly.time.forEach((t, i) => {
        const d = new Date(t); if (d.toDateString() !== todayStr) return;
        const h = d.getHours(), v = omData.hourly.temperature_2m[i];
        if (h >= 5 && h < 12) manana.push(v);
        if (h >= 12 && h < 18) tarde.push(v);
        if (h >= 18 && h < 24) noche.push(v);
    });
    const avg = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null;
    const su = state.unit === 'C' ? 'c' : 'f';
    const fmt = v => v !== null ? `${toUnit(v)}°<sub>${su}</sub>` : `--°<sub>${su}</sub>`;
    dom.pMorning.innerHTML = fmt(avg(manana));
    dom.pAfternoon.innerHTML = fmt(avg(tarde));
    dom.pEvening.innerHTML = fmt(avg(noche));
}

// ════════════════════════════════════════════════
// POR HORA
// ════════════════════════════════════════════════
function renderHourly(omData) {
    const now = new Date(), nH = now.getHours() + 1;
    const pad = n => n.toString().padStart(2, '0');
    const td = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const tom = new Date(now); tom.setDate(tom.getDate() + 1);
    const tm = `${tom.getFullYear()}-${pad(tom.getMonth() + 1)}-${pad(tom.getDate())}`;
    const items = [];
    omData.hourly.time.forEach((iso, i) => {
        const dp = iso.slice(0, 10), hp = parseInt(iso.slice(11, 13), 10);
        if (!(dp === td && hp >= nH) && !(dp === tm && hp === 0)) return;
        const info = wmoInfo(omData.hourly.weathercode[i], hp < 6 || hp >= 20);
        items.push({ time: `${pad(hp)}:00`, temp: omData.hourly.temperature_2m[i], icon: info.icon, desc: info.desc });
    });
    if (!items.length) { dom.hourlyRow.innerHTML = '<p class="no-data">Sin más horas hoy</p>'; return; }
    dom.hourlyRow.innerHTML = items.map(it =>
        `<div class="hourly-card">
      <span class="hc-time">${it.time}</span>
      <img class="hc-icon" src="https://openweathermap.org/img/wn/${it.icon}.png" alt="${it.desc}"/>
      <span class="hc-temp">${toUnit(it.temp)}°</span>
      <span class="hc-desc">${it.desc}</span>
    </div>`
    ).join('');
}

// ════════════════════════════════════════════════
// 7 DÍAS
// ════════════════════════════════════════════════
function renderDaily(omData) {
    const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dom.dailyList.innerHTML = omData.daily.time.map((ds, i) => {
        const d = new Date(ds + 'T12:00:00'), info = wmoInfo(omData.daily.weathercode[i], false);
        const max = Math.round(omData.daily.temperature_2m_max[i]);
        const min = Math.round(omData.daily.temperature_2m_min[i]);
        const label = i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : DIAS[d.getDay()];
        return `<div class="daily-row">
      <span class="dr-day">${label}</span>
      <img class="dr-icon" src="https://openweathermap.org/img/wn/${info.icon}.png" alt="${info.desc}"/>
      <span class="dr-desc">${info.desc}</span>
      <div class="dr-temps">
        <span class="dr-max">${toUnit(max)}°</span>
        <span class="dr-sep">/</span>
        <span class="dr-min">${toUnit(min)}°</span>
      </div>
    </div>`;
    }).join('');
}

// ════════════════════════════════════════════════
//  FONDO 
//
// Estrategia sin parpadeo:
//  1. Caché → instantáneo (si existe)
//  2. Gradiente de color → visible AL INSTANTE (sin SVG oscuro)
//  3. Pexels: barrio → ciudad → estado/región
//  4. Fallback temático de clima
//  5. Si todo falla → gradiente queda como fondo definitivo 
// ════════════════════════════════════════════════

async function setCityBackground(placeName, cityName, stateName, weatherId, iconCode) {
    const isNight = iconCode.endsWith('n');
    const cacheKey = `bg_${placeName}_${cityName}_${weatherId}_v13`;

    // ── 1. Caché
    const cached = getFromImgCache(cacheKey);
    if (cached) { applyBg(cached, weatherId, isNight); return; }

    // ── 2. Gradiente inmediato (limpia foto anterior)
    applyGradient(weatherId, isNight);

    // ── 3. Buscar + precargar foto en Pexels
    try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), IMG_TIMEOUT);

        // Intenta foto del lugar, luego fallback de clima
        const candidates = [
            () => pexelsQueryChain(placeName, cityName, stateName, ctrl.signal),
            () => pexelsWeatherFallback(weatherId, isNight, ctrl.signal),
        ];

        let photoUrl = null;
        for (const fn of candidates) {
            const url = await fn();
            if (!url) continue;
            try {
                await preloadImage(url);   // si falla (timeout/error), intenta el siguiente candidato
                photoUrl = url;
                break;
            } catch {
                console.warn('[BG] preload falló, intentando siguiente candidato...');
            }
        }

        clearTimeout(tid);

        if (photoUrl) {
            setImgCache(cacheKey, photoUrl);
            applyBg(photoUrl, weatherId, isNight);
        }
    } catch { }
}

// ── Cadena de queries: barrio → ciudad → estado ──
async function pexelsQueryChain(placeName, cityName, stateName, signal) {
    // Normaliza acentos: "Cancún" → "Cancun", "Mérida" → "Merida"
    const place = normalizeQuery(placeName || '');
    const city = normalizeQuery(cityName || '');
    const state = normalizeQuery(stateName || '');

    // 1. Nombre del lugar solo, luego con Mexico
    const placeQueries = [place, `${place} Mexico`];

    // Para nombres compuestos extrae la última palabra significativa
    const words = place.trim().split(/\s+/).filter(w => w.length > 3);
    if (words.length > 1) placeQueries.push(`${words[words.length - 1]} Mexico`);

    for (const q of placeQueries) {
        const url = await pexelsFetch(q, signal);
        if (url) return url;
    }

    // 2. Ciudad padre si es diferente
    if (city && city.toLowerCase() !== place.toLowerCase()) {
        for (const q of [city, `${city} Mexico`]) {
            const url = await pexelsFetch(q, signal);
            if (url) return url;
        }
    }

    // 3. Estado como último fallback geográfico
    if (state && state.toLowerCase() !== city.toLowerCase()) {
        const stateShort = state.split(' ')[0];
        const url = await pexelsFetch(`${stateShort} Mexico`, signal);
        if (url) return url;
    }

    return null;
}

// ── Llamada única a Pexels ───────────────────────
async function pexelsFetch(query, signal) {
    if (!query || query.length < 2) return null;
    try {
        const res = await fetch(
            `${PEXELS_BASE}/search?query=${encodeURIComponent(query)}&per_page=30`,
            { signal, headers: { Authorization: PEXELS_KEY } }
        );

        if (!res.ok) {
            console.warn(`[Pexels] HTTP ${res.status} — "${query}"`);
            return null;
        }

        const data = await res.json();
        const photos = data.photos || [];
        if (!photos.length) { console.log(`[Pexels] Sin resultados — "${query}"`); return null; }

        // Filtra por ratio paisaje
        let pool = photos.filter(p => p.width >= p.height * 1.2);
        if (!pool.length) pool = photos.filter(p => p.width > p.height);
        if (!pool.length) pool = photos;

        // Top-5 → elige aleatoriamente para variar entre ciudades vecinas
        const top5 = pool.sort((a, b) => (b.width * b.height) - (a.width * a.height)).slice(0, 5);
        const pick = top5[Math.floor(Math.random() * top5.length)];

        // ✅ Usa large2x (máx ~2560px, ~1-3MB) en vez de original (puede ser 20MB+)
        // large2x es más que suficiente para un fondo de pantalla y carga rápido
        const url = pick.src.large2x || pick.src.large || pick.src.original;

        console.log(`[Pexels]  "${query}" → ${pick.width}×${pick.height}`);
        return url;

    } catch (err) {
        if (err?.name !== 'AbortError') console.warn(`[Pexels] Error — "${query}":`, err?.message);
        return null;
    }
}

// ── Precargar imagen con timeout propio de 8s ──────
// Evita que una imagen pesada bloquee indefinidamente
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const timeout = setTimeout(() => {
            img.src = '';          // cancela la carga
            reject(new Error('preload timeout'));
        }, 8000);
        img.onload = () => { clearTimeout(timeout); resolve(url); };
        img.onerror = () => { clearTimeout(timeout); reject(new Error('preload error')); };
        img.src = url;
    });
}

// ── Fallback temático de clima desde Pexels ──────
// Queries simples y genéricos — siempre tienen resultados
const WEATHER_QUERIES = {
    night: 'city lights night',
    thunder: 'thunderstorm lightning',
    rain: 'rain city street',
    snow: 'snow winter city',
    fog: 'fog mist city',
    clear: 'sunny blue sky',
    clouds: 'clouds sky city',
};

async function pexelsWeatherFallback(weatherId, isNight, signal) {
    let key = 'clouds';
    if (isNight) key = 'night';
    else if (weatherId >= 200 && weatherId < 300) key = 'thunder';
    else if (weatherId >= 300 && weatherId < 600) key = 'rain';
    else if (weatherId >= 600 && weatherId < 700) key = 'snow';
    else if (weatherId >= 700 && weatherId < 800) key = 'fog';
    else if (weatherId === 800) key = 'clear';
    console.log(`[Pexels] Fallback clima — "${WEATHER_QUERIES[key]}"`);
    return await pexelsFetch(WEATHER_QUERIES[key], signal);
}

// ── Normaliza texto para queries Pexels (quita acentos) ──
function normalizeQuery(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ── Timer global para cancelar fades pendientes ──
let _bgFadeTimer = null;

// ── Aplica gradiente al instante Y limpia la foto anterior ──
function applyGradient(weatherId, isNight) {
    if (_bgFadeTimer) { clearTimeout(_bgFadeTimer); _bgFadeTimer = null; }
    const grad = getGradientValue(weatherId, isNight);
    // Fade rápido a gradiente limpio (sin foto previa)
    dom.cityBgImg.style.transition = 'opacity 0.2s ease';
    dom.cityBgImg.style.opacity = '0';
    _bgFadeTimer = setTimeout(() => {
        _bgFadeTimer = null;
        dom.cityBgImg.style.backgroundImage = grad;
        dom.cityBgImg.style.backgroundSize = '100% 100%';
        dom.cityBgImg.style.backgroundPosition = 'center';
        dom.cityBgImg.style.backgroundRepeat = 'no-repeat';
        void dom.cityBgImg.offsetHeight;
        dom.cityBgImg.style.transition = 'opacity 0.3s ease';
        dom.cityBgImg.style.opacity = '1';
    }, 210);
}

// ── Aplica foto con fade suave ──
function applyBg(url, weatherId, isNight) {
    if (_bgFadeTimer) { clearTimeout(_bgFadeTimer); _bgFadeTimer = null; }
    const grad = getGradientValue(weatherId, isNight);
    dom.cityBgImg.style.transition = 'opacity 0.25s ease';
    dom.cityBgImg.style.opacity = '0';
    _bgFadeTimer = setTimeout(() => {
        _bgFadeTimer = null;
        dom.cityBgImg.style.backgroundImage = `url("${url}"), ${grad}`;
        dom.cityBgImg.style.backgroundSize = 'cover, 100% 100%';
        dom.cityBgImg.style.backgroundPosition = 'center center, center';
        dom.cityBgImg.style.backgroundRepeat = 'no-repeat, no-repeat';
        void dom.cityBgImg.offsetHeight;
        dom.cityBgImg.style.transition = 'opacity 0.7s ease';
        dom.cityBgImg.style.opacity = '1';
    }, 260);
}

// ════════════════════════════════════════════════
// GRADIENTES DE RESPALDO
// ════════════════════════════════════════════════
function getGradientValue(weatherId, isNight) {
    const g = {
        night: 'linear-gradient(160deg,#060614 0%,#0d1030 50%,#1a1a4a 100%)',
        thunder: 'linear-gradient(160deg,#0a0814 0%,#1a0a30 50%,#2a1060 100%)',
        rain: 'linear-gradient(160deg,#0d1520 0%,#132540 50%,#1a3560 100%)',
        snow: 'linear-gradient(160deg,#1a253a 0%,#253a60 50%,#3a5080 100%)',
        fog: 'linear-gradient(160deg,#141820 0%,#202535 50%,#2a3048 100%)',
        clear: 'linear-gradient(160deg,#0a3a60 0%,#1a5a8a 50%,#2a7aaa 100%)',
        clouds: 'linear-gradient(160deg,#131520 0%,#202030 50%,#2a2a40 100%)',
    };
    let k = 'clouds';
    if (isNight) k = 'night';
    else if (weatherId >= 200 && weatherId < 300) k = 'thunder';
    else if (weatherId >= 300 && weatherId < 600) k = 'rain';
    else if (weatherId >= 600 && weatherId < 700) k = 'snow';
    else if (weatherId >= 700 && weatherId < 800) k = 'fog';
    else if (weatherId === 800) k = 'clear';
    return g[k];
}

// ════════════════════════════════════════════════
// RELOJ
// ════════════════════════════════════════════════
function startClock() { updateClock(); setInterval(updateClock, 1000); }
function updateClock() {
    let now;
    if (state.timezone === 'local') { now = new Date(); }
    else {
        try { now = new Date(new Date().toLocaleString('en-US', { timeZone: state.timezone })); }
        catch { now = new Date(); }
    }
    dom.clockBig.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    dom.dateStr.textContent = `${DIAS[now.getDay()]}, ${now.getDate()} ${MESES[now.getMonth()]} ${now.getFullYear()}`;
}

// ════════════════════════════════════════════════
// UNIDADES / HISTORIAL / TOAST / UTILS
// ════════════════════════════════════════════════
function setUnit(unit) {
    state.unit = unit;
    $('btnC').classList.toggle('active', unit === 'C');
    $('btnF').classList.toggle('active', unit === 'F');
    if (state.lastData) {
        const { current, omData, displayName, cityName, stateName = '' } = state.lastData;
        render(current, omData, displayName, cityName, stateName);
    }
}
function toUnit(c) { return state.unit === 'F' ? Math.round(c * 9 / 5 + 32) : Math.round(c); }

function getHistory() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; } }
function saveHistory(h) { localStorage.setItem(HISTORY_KEY, JSON.stringify(h)); }

function autoSaveCity(name) {
    const cap = capitalize(name);
    let h = getHistory().filter(c => c.name.toLowerCase() !== name.toLowerCase());
    h.unshift({ name: cap });
    if (h.length > MAX_HIST) h = h.slice(0, MAX_HIST);
    saveHistory(h); renderHistory();
}
function saveCurrentCity() {
    if (!state.currentCity) return;
    autoSaveCity(state.currentCity);
    showToast(state.isFromGeo
        ? ` Ubicación "${capitalize(state.currentCity)}" guardada`
        : ` "${capitalize(state.currentCity)}" guardada`);
}
function removeCity(name) {
    saveHistory(getHistory().filter(c => c.name.toLowerCase() !== name.toLowerCase()));
    renderHistory();
}
function renderHistory() {
    const hist = getHistory();
    if (!hist.length) { dom.historyChips.innerHTML = ''; return; }
    dom.historyChips.innerHTML = hist.map(c =>
        `<span class="h-chip-wrap">
      <button class="h-chip" data-city="${c.name}">${c.name}</button>
      <button class="h-chip-del" data-city="${c.name}" title="Eliminar">×</button>
    </span>`
    ).join('');
    dom.historyChips.querySelectorAll('.h-chip').forEach(b =>
        b.addEventListener('click', () => searchCity(b.dataset.city)));
    dom.historyChips.querySelectorAll('.h-chip-del').forEach(b =>
        b.addEventListener('click', e => { e.stopPropagation(); removeCity(b.dataset.city); }));
}

function showToast(msg) {
    dom.toast.textContent = msg; dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), 2500);
}
function handleError(err) {
    if (err.status === 401) showError('API Key inválida');
    else if (err.status === 404) showError('Ciudad no encontrada');
    else if (err.status === 429) showError('Demasiadas peticiones, espera un momento');
    else showError('Error de conexión');
}
function showError(msg) { dom.errorText.textContent = msg; dom.errorBar.classList.add('show'); setTimeout(() => dom.errorBar.classList.remove('show'), 4500); }
function hideError() { dom.errorBar.classList.remove('show'); }
function showLoader() { state.loading = true; dom.loader.classList.remove('hidden'); }
function hideLoader() { state.loading = false; dom.loader.classList.add('hidden'); }
function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
function utcTime(ts, offset) {
    const d = new Date((ts + offset) * 1000);
    return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`;
}
function shakeBar() {
    document.querySelector('.search-bar').animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(0)' }],
        { duration: 350, easing: 'ease-out' }
    );
}
function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

// ── START ────────────────────────────────────────
init();
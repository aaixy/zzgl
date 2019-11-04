/*
Title: Custom Vehicles
Author: DK (Denis Kuznetsov) (https://vk.com/dk_plugins)
Site: http://dk-plugins.ru
Group in VK: http://vk.com/dkplugins
Version: 1.0
Release: 23.08.2016
First release: 23.08.2016
Supported languages: Russian, English
*/

/*ru
Название: Транспорт
Автор: DK (Денис Кузнецов) (https://vk.com/dk_plugins)
Сайт: http://dk-plugins.ru
Группа ВК: http://vk.com/dkplugins
Версия: 1.0
Релиз: 23.08.2016
Первый релиз: 23.08.2016
Поддерживаемые языки: Русский, Английский
*/

var Custom_Vehicles = {};

//===========================================================================
// Настройки плагина
// Plugin settings
//===========================================================================

// Инструкция
// Instruction

// Russian
// Custom_Vehicles[type] = { speed, startMapId, startX, startY, characterName, characterIndex, regions, bgm };
// type - Название транспорта (тип)
// speed - Скорость транспорта
// startMapId - Стартовый номер карты транспорта
// startX - Стартовая координата X транспорта
// startY - Стартовая координата Y транспорта
// characterName - Название графики
// characterIndex - Индекс графики
// regions - Список номеров регионов, по которым транспорт может перемещаться (-1 для всех регионов, 0 - нет региона) (необязательный параметр)
// bgm - BGM транспорта (необязательный параметр)
// bgm name - Название BGM
// bgm volume - Громкость
// bgm pitch - Тон
// bgm pan - Панорама
// Пример1: Custom_Vehicles['car'] = { speed: 7, startMapId: 1, startX: 3, startY: 2, characterName: 'SF_Vehicle', characterIndex: 6, bgm: { name: 'Ship1', volume: 90, pitch: 100, pan: 0 } };
// Пример2: Custom_Vehicles['bike'] = { speed: 5, startMapId: 1, startX: 3, startY: 3, characterName: 'SF_Vehicle', characterIndex: 1, regions: [0, 2, 3] };
// Пример3: Custom_Vehicles['motorcycle'] = { speed: 6, startMapId: 1, startX: 3, startY: 4, characterName: 'SF_Vehicle', characterIndex: 2 };

// English
// Custom_Vehicles[TYPE] = { speed, startMapId, startX, startY, characterName, characterIndex, regions, bgm };
// type - Vehicle name (type)
// speed - Vehicle speed
// startMapId - Started map id of vehicle
// startX - Started coordinate X of vehicle
// startY - Started coordinate Y of vehicle
// characterName - Image name
// characterIndex - Image index
// regions - Index list of regions where vehicles can drive (-1 for all regions, 0 - empty region) (optional)
// bgm - Vehicle BGM (optional)
// bgm name - BGM name
// bgm volume - Volume
// bgm pitch - Pitch
// bgm pan - Panorama
// Example1: Custom_Vehicles['car'] = { speed: 7, startMapId: 1, startX: 3, startY: 2, characterName: 'SF_Vehicle', characterIndex: 6, bgm: { name: 'Ship1', volume: 90, pitch: 100, pan: 0 } };
// Example2: Custom_Vehicles['bike'] = { speed: 5, startMapId: 1, startX: 3, startY: 3, characterName: 'SF_Vehicle', characterIndex: 1, regions: [0, 2, 3] };
// Example3: Custom_Vehicles['motorcycle'] = { speed: 6, startMapId: 1, startX: 3, startY: 4, characterName: 'SF_Vehicle', characterIndex: 2 };

//Custom_Vehicles['car'] = { speed: 5, startMapId: 1, startX: 3, startY: 12, characterName: 'SF_Vehicle', characterIndex: 6, regions: [1, 2], bgm: { name: 'Ship1', volume: 90, pitch: 100, pan: 0 } };
//Custom_Vehicles['bike'] = { speed: 4, startMapId: 1, startX: 3, startY: 13, characterName: 'SF_Vehicle', characterIndex: 1, regions: [-1] };

//===========================================================================
// Конец настройки плагина
// End of plugin settings
//===========================================================================

/*:
 * @plugindesc v.1.0 Adds ground vehicles
 * @author DK (Denis Kuznetsov)
 * @help

 ### Info about plugin ###
 Title: DK_Custom_Vehicles
 Author: DK (Denis Kuznetsov) (https://vk.com/dk_plugins)
 Site: http://dk-plugins.ru
 Group in VK: http://vk.com/dkplugins
 Version: 1.0
 Release: 23.08.2016
 First release: 23.08.2016
 Supported languages: Russian, English

 ### Warning ###
 The plugin contains the settings in the file

 Be careful with downloading plugins to the project folder
 Some plugins have settings in his file
 At update this settings can be overwritten

 ### Instruction ###
 Open the DK_Custom_Vehicles.js and customize vehicles within the field "Plugin settings"

 Plugin commands:
 1. Change Vehicle BGM
 ChangeVehicleBGM [TYPE] [NAME] [VOLUME] [PITCH] [PAN]
 TYPE - Vehicle type
 NAME - BGM name
 VOLUME - Volume
 PITCH - Pitch
 PAN - Panorama
 Example: ChangeVehicleBGM bike Ship1 100 100 0

 2. Set Vehicle Location
 SetVehicleLocation [TYPE] [MAP ID] [X] [Y]
 TYPE - Vehicle type
 MAP ID - Map id
 X - The X coordinate
 Y - The Y coordinate
 Example: SetVehicleLocation bike 2 1 1

 3. Change Vehicle Image
 ChangeVehicleImage [TYPE] [NAME] [INDEX]
 TYPE - Vehicle type
 NAME - Image name
 INDEX - Image index
 Example: ChangeVehicleImage car Vehicle 0

 4. Set Vehicle Speed
 SetVehicleMoveSpeed [TYPE] [SPEED]
 TYPE - Vehicle type
 SPEED - Speed
 Example: SetVehicleMoveSpeed car 4

 ### License and terms of use for plugin ###
 You can:
 -Free use the plugin for your commercial and non commercial projects.
 -Translate the plugin to other languages (please, inform, if you do this)

 You can't:
 -Delete or change any information about plugin (Title, authorship, contact information, version and release)
 -Change code of plugin out of border "Plugin settings" and "End of plugin settings" (if you found a bug contact me)

*/

/*:ru
 * @plugindesc v.1.0 Добавляет наземный транспорт
 * @author DK (Денис Кузнецов)
 * @help

 ### Информация о плагине ###
 Название: DK_Custom_Vehicles
 Автор: DK (Денис Кузнецов) (https://vk.com/dk_plugins)
 Сайт: http://dk-plugins.ru
 Группа ВК: http://vk.com/dkplugins
 Версия: 1.0
 Релиз: 23.08.2016
 Первый релиз: 23.08.2016
 Поддерживаемые языки: Русский, Английский

 ### Внимание ###
 Плагин содержит настройки внутри файла

 Будьте внимательны при скачивании плагинов в папку проекта
 Некоторые плагины имеют настройки в самом файле
 При обновлении эти настройки могут быть перезаписаны

 ### Инструкция ###
 Открыть DK_Custom_Vehicles.js и настроить транспорт внутри поля "Настройки плагина"

 Команды плагина:
 1. Изменить BGM транспорта
 ChangeVehicleBGM [TYPE] [NAME] [VOLUME] [PITCH] [PAN]
 TYPE - Тип транспорта
 NAME - Название BGM
 VOLUME - Громкость
 PITCH - Тон
 PAN - Панорама
 Пример: ChangeVehicleBGM bike Ship1 100 100 0

 2. Переместить транспорт
 SetVehicleLocation [TYPE] [MAP ID] [X] [Y]
 TYPE - Тип транспорта
 MAP ID - Номер карты
 X - Координата X
 Y - Координата Y
 Пример: SetVehicleLocation bike 2 1 1

 3. Изменить изображение транспорта
 ChangeVehicleImage [TYPE] [NAME] [INDEX]
 TYPE - Тип транспорта
 NAME - Название изображения
 INDEX - Индекс изображения
 Пример: ChangeVehicleImage car Vehicle 0

 4. Изменить скорость транспорта
 SetVehicleMoveSpeed [TYPE] [SPEED]
 TYPE - Тип транспорта
 SPEED - Скорость
 Пример: SetVehicleMoveSpeed car 4

 ### Лицензия и правила использования плагина ###
 Вы можете:
 -Бесплатно использовать данный плагин в некоммерческих и коммерческих проектах
 -Переводить плагин на другие языки (пожалуйста, сообщите, если Вы перевели плагин на другой язык)

 Вы не можете:
 -Убирать или изменять любую информацию о плагине (Название, авторство, контактная информация, версия и дата релиза)
 -Изменять код плагина вне поля "Настройки плагина" и "Конец настройки плагина" (если нашли ошибку, напишите мне о ней)

*/

var Imported = Imported || {};
Imported.DK_Custom_Vehicles = true;

var DKVersion = DKVersion || {};
DKVersion.DK_Custom_Vehicles = 1.0;

//===========================================================================
// Game Character Base
//===========================================================================

Game_CharacterBase.prototype.isCollidedWithVehicles = function(x, y) {
    var vehicles = $gameMap.vehicles();
    for(var i = 0; i < vehicles.length; i++)
    {
        var vehicle = vehicles[i];
        var type = vehicle._type;
        if (type === 'airship') continue;
        if (vehicle.posNt(x, y)) return true;
    }
    return false;
};

//===========================================================================
// Game Map
//===========================================================================

var Custom_Vehicles_Game_Map_createVehicles = Game_Map.prototype.createVehicles;
Game_Map.prototype.createVehicles = function() {
    Custom_Vehicles_Game_Map_createVehicles.call(this);
    for(var vehicle in Custom_Vehicles)
        this._vehicles.push(new Game_Vehicle(vehicle));
};

Game_Map.prototype.customVehicleType = function(x, y) {
    var vehicles = this.vehicles();
    for(var i = 0; i < vehicles.length; i++)
    {
        var vehicle = vehicles[i];
        if (vehicle.posNt(x, y)) return vehicle._type;
    }
    return null;
};

Game_Map.prototype.vehicle = function(type) {
    var vehicles = this.vehicles();
    if (Number(type))
        return vehicles[type];
    else
    {
        for(var i = 0; i < vehicles.length; i++)
        {
            var vehicle = vehicles[i];
            if (vehicle._type === type)
                return vehicle;
        }
    }
    return null;
};

//===========================================================================
// Game Player
//===========================================================================

Game_Player.prototype.triggerTouchActionD2 = function(x2, y2) {
    if (this.isCollidedWithVehicles(x2, y2))
    {
        if (TouchInput.isTriggered() && this.getOnVehicle())
            return true;
    }
    if (this.isInBoat() || this.isInShip() || this.isInCustomVehicle())
    {
        if (TouchInput.isTriggered() && this.getOffVehicle())
            return true;
    }
    this.checkEventTriggerThere([0, 1, 2]);
    return $gameMap.setupStartingEvent();
};

Game_Player.prototype.isInCustomVehicle = function() {
    return !this.isInBoat() && !this.isInShip() && !this.isInAirship() && this._vehicleType !== 'walk' && !this.isMoveRouteForcing();
};

var Custom_Vehicles_Game_Player_isInVehicle = Game_Player.prototype.isInVehicle;
Game_Player.prototype.isInVehicle = function() {
    return Custom_Vehicles_Game_Player_isInVehicle.call(this) || this.isInCustomVehicle();
};

Game_Player.prototype.getOnVehicle = function() {
    var direction = this.direction();
    var x1 = this.x;
    var y1 = this.y;
    var x2 = $gameMap.roundXWithDirection(x1, direction);
    var y2 = $gameMap.roundYWithDirection(y1, direction);
    if ($gameMap.airship().pos(x1, y1))
        this._vehicleType = 'airship';
    else if ($gameMap.ship().pos(x2, y2))
        this._vehicleType = 'ship';
    else if ($gameMap.boat().pos(x2, y2))
        this._vehicleType = 'boat';
    else
    {
        var type = $gameMap.customVehicleType(x2, y2);
        if (type) this._vehicleType = type;
    }
    if (this.isInVehicle())
    {
        this._vehicleGettingOn = true;
        if (!this.isInAirship())
            this.forceMoveForward();
        this.gatherFollowers();
    }
    return this._vehicleGettingOn;
};

//===========================================================================
// Game Vehicle
//===========================================================================

Game_Vehicle.prototype.isCustomVehicle = function() {
    return !this.isBoat() && !this.isShip() && !this.isAirship();
};

Game_Vehicle.prototype.initMoveSpeed = function() {
    if (this.isBoat())
        this.setMoveSpeed(4);
    else if (this.isShip())
        this.setMoveSpeed(5);
    else if (this.isAirship())
        this.setMoveSpeed(6);
    else if (this.isCustomVehicle())
        this.setMoveSpeed(this.vehicle().speed);
};

Game_Vehicle.prototype.vehicle = function() {
    if (this.isBoat())
        return $dataSystem.boat;
    else if (this.isShip())
        return $dataSystem.ship;
    else if (this.isAirship())
        return $dataSystem.airship;
    return Custom_Vehicles[this._type];
};

Game_Vehicle.prototype.playBgm = function() {
    var bgm = this._bgm || this.vehicle().bgm;
    if (!bgm && this.isCustomVehicle()) return;
    AudioManager.playBgm(bgm);
};

Game_Vehicle.prototype.isMapPassable = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    if (this.isBoat())
        return $gameMap.isBoatPassable(x2, y2);
    else if (this.isShip())
        return $gameMap.isShipPassable(x2, y2);
    else if (this.isAirship())
        return true;
    else if (this.isCustomVehicle())
    {
        var regions = this.vehicle().regions || [-1];
        return $gameMap.isPassable(x2, y2) && (regions.contains($gameMap.regionId(x2, y2)) || regions.contains(-1));
    }
    return false;
};

//===========================================================================
// Game Interpreter
//===========================================================================

var Custom_Vehicles_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Custom_Vehicles_Game_Interpreter_pluginCommand.call(this, command, args);
    switch(command)
    {
        case 'ChangeVehicleBGM':
        {
            var type = args[0];
            var vehicle = $gameMap.vehicle(type);
            var bgm = { name: args[1], volume: Number(args[2]), pitch: Number(args[3]), pan: Number(args[4]) };
            if (vehicle)
                vehicle.setBgm(bgm);
            break;
        }
        case 'SetVehicleLocation':
        {
            var type = args[0];
            var map_id = Number(args[1]);
            var x = Number(args[2]);
            var y = Number(args[3]);
            var vehicle = $gameMap.vehicle(type);
            if (vehicle)
                vehicle.setLocation(map_id, x, y);
            break;
        }
        case 'ChangeVehicleImage':
        {
            var type = args[0];
            var name = args[1];
            var index = Number(args[2]);
            var vehicle = $gameMap.vehicle(type);
            if (vehicle)
                vehicle.setImage(name, index);
            break;
        }
        case 'SetVehicleMoveSpeed':
        {
            var type = args[0];
            var speed = Number(args[1]);
            var vehicle = $gameMap.vehicle(type);
            if (vehicle)
                vehicle.setMoveSpeed(speed);
            break;
        }
    }
};
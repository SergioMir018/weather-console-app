# Information

This is a console app that uses the user input to search for a place

```
==========================
|    Select an option    |
==========================
? What do you want to do? (Use arrow keys)
> 1. Find city
  2. History
  0. Exit
```

Then shows a number of coincidences with the search term

```
? What do you want to do? 1. Find city
? City:  Madrid
? Select:  (Use arrow keys)
> 0. Cancel 
  1.  Madrid, Madrid, Spain 
  2.  Madrid, Spain 
  3.  Adolfo Suárez Madrid-Barajas Airport, Av. de la Hispanidad, s/n, Madrid, Madrid 28042, Spain 
  4.  Cuatro Vientos Airport, Avenida de la Aviación, Madrid, Madrid 28054, Spain 
  5.  Madridejos, Toledo, Spain
```

And after a selection it show the current weather information of the selected place

```
? City:  Madrid
? Select:  2.  Madrid, Spain


===== Selected place info: =====
Name: Madrid, Spain
Lng: -3.7035825
Lat: 40.4167047
Avg Temp: 15.8
Min Temp: 14.53
Max Temp: 16.53
Humidity: 85
Current Weather: scattered clouds
```
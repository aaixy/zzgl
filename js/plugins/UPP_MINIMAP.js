/*:
* @plugindesc Displays a mini-map in the game.
* @author William Ramsey (TheUnproPro)
*
* @param Minimap X
* @desc X position of the mini map.
* @default 16
*
* @param Minimap Y
* @desc X position of the mini map.
* @default 16
*
* @param Minimap Size Base
* @desc Scale of the mini map.
* @default 4
*
* @param Use Collision Map
* @desc Disable this to manually draw the map with regions.
* @default true
*
* @param Minimap Hide X
* @desc Where the mini-map moves when it hides.
* @default 0
*
* @param Minimap Hide Y
* @desc Where the mini-map moves when it hides.
* @default -200
*
* @param Minimap Zoom Button
* @desc Button to zoom in mini-map (use none to disable)
* @default pageup
*
* @param Minimap Scale Zoom
* @desc Zoom level when the map is zoomed in.
* @default 8
*
* @param Custom Name X Offset
* @desc X offset of the name on the minimap.
* @default 0
*
* @param Custom Name Y Offset
* @desc Y offset of the name on the minimap.
* @default 0
*
* @param Custom Name Border
* @desc Draw a border around the custom name.
* @default true
*
* @param Custom Name Padding
* @desc Padding for the text inside the name box.
* @default 4
*
* @param Custom Name Size
* @desc Size of the font for the name on the minimap.
* @default 24
*
* @param Custom Name Color
* @desc Color of the name on the minimap.
* @default #ffffff
*
* @param Custom Name BG
* @desc Give it a background color.
* @default rgba(0, 0, 0, 0.5)
*
* @param Custom Name Show Window BG
* @desc Show the default windowskins bg.
* @default false
*
* @param Custom Name Location
* @desc Location of the name display (TOP, MID, BOTTOM)
* @default BELOW
*
* @param Show Custom Name
* @desc Show a customized name on the map using Notetag on map.
* @default true
*
* @param Hide Map At Start
* @desc Toggle hiding the map at game start.
* @default false
*
* @param Minimap Player Color
* @desc The color of the player on the minimap.
* @default #ffff00
*
* @param Show Player
* @desc Determine if the player location will show.
* @default true
*
* @param Player Uses Circle Indicator
* @desc Determine if the player locator uses a circle.
* @default true
*
* @param Events Use Circle Indicator
* @desc Determine if the Event Indicator use a circle.
* @default true
*
* @param Default Event Indicator Color
* @desc Default color used for event indicator.
* @default #33ff33
*
* @param Event Beacon Power
* @desc How fast the beacon expands
* @default 0.2
*
* @param Event Beacon Fade Speed
* @desc How fast the beacon fades out
* @default 4
*
* @param Event Beacon Repeat
* @desc Timer to determine when the beacon repeats.
* @default 120
*
* @param Impassable Color
* @desc Define the impassable color
* @default #005599
*
* @param Passable Color
* @desc Define the passable color
* @default #0099cc
*
* @param Border Padding
* @desc draw a window border around the mini map.
* @default 8
*
* @param Draw Border
* @desc draw a window border around the mini map.
* @default true
*
* @param Region 0 Color
* @desc The color set for the region 0
* @default NONE
*
* @param Region 1 Color
* @desc The color set for the region 1
* @default NONE
*
* @param Region 2 Color
* @desc The color set for the region 2
* @default NONE
*
* @param Region 3 Color
* @desc The color set for the region 3
* @default NONE
*
* @param Region 4 Color
* @desc The color set for the region 4
* @default NONE
*
* @param Region 5 Color
* @desc The color set for the region 5
* @default NONE
*
* @param Region 6 Color
* @desc The color set for the region 6
* @default NONE
*
* @param Region 7 Color
* @desc The color set for the region 7
* @default NONE
*
* @param Region 8 Color
* @desc The color set for the region 8
* @default NONE
*
* @param Region 9 Color
* @desc The color set for the region 9
* @default NONE
*
* @param Region 10 Color
* @desc The color set for the region 10
* @default NONE
*
* @param Region 11 Color
* @desc The color set for the region 11
* @default NONE
*
* @param Region 12 Color
* @desc The color set for the region 12
* @default NONE
*
* @param Region 13 Color
* @desc The color set for the region 13
* @default NONE
*
* @param Region 14 Color
* @desc The color set for the region 14
* @default NONE
*
* @param Region 15 Color
* @desc The color set for the region 15
* @default NONE
*
* @param Region 16 Color
* @desc The color set for the region 16
* @default NONE
*
* @param Region 17 Color
* @desc The color set for the region 17
* @default NONE
*
* @param Region 18 Color
* @desc The color set for the region 18
* @default NONE
*
* @param Region 19 Color
* @desc The color set for the region 19
* @default NONE
*
* @param Region 20 Color
* @desc The color set for the region 20
* @default NONE
*
* @param Region 21 Color
* @desc The color set for the region 21
* @default NONE
*
* @param Region 22 Color
* @desc The color set for the region 22
* @default NONE
*
* @param Region 23 Color
* @desc The color set for the region 23
* @default NONE
*
* @param Region 24 Color
* @desc The color set for the region 24
* @default NONE
*
* @param Region 25 Color
* @desc The color set for the region 25
* @default NONE
*
* @param Region 26 Color
* @desc The color set for the region 26
* @default NONE
*
* @param Region 27 Color
* @desc The color set for the region 27
* @default NONE
*
* @param Region 28 Color
* @desc The color set for the region 28
* @default NONE
*
* @param Region 29 Color
* @desc The color set for the region 29
* @default NONE
*
* @param Region 30 Color
* @desc The color set for the region 30
* @default NONE
*
* @param Region 31 Color
* @desc The color set for the region 31
* @default NONE
*
* @param Region 32 Color
* @desc The color set for the region 32
* @default NONE
*
* @param Region 33 Color
* @desc The color set for the region 33
* @default NONE
*
* @param Region 34 Color
* @desc The color set for the region 34
* @default NONE
*
* @param Region 35 Color
* @desc The color set for the region 35
* @default NONE
*
* @param Region 36 Color
* @desc The color set for the region 36
* @default NONE
*
* @param Region 37 Color
* @desc The color set for the region 37
* @default NONE
*
* @param Region 38 Color
* @desc The color set for the region 38
* @default NONE
*
* @param Region 39 Color
* @desc The color set for the region 39
* @default NONE
*
* @param Region 40 Color
* @desc The color set for the region 40
* @default NONE
*
* @param Region 41 Color
* @desc The color set for the region 41
* @default NONE
*
* @param Region 42 Color
* @desc The color set for the region 42
* @default NONE
*
* @param Region 43 Color
* @desc The color set for the region 43
* @default NONE
*
* @param Region 44 Color
* @desc The color set for the region 44
* @default NONE
*
* @param Region 45 Color
* @desc The color set for the region 45
* @default NONE
*
* @param Region 46 Color
* @desc The color set for the region 46
* @default NONE
*
* @param Region 47 Color
* @desc The color set for the region 47
* @default NONE
*
* @param Region 48 Color
* @desc The color set for the region 48
* @default NONE
*
* @param Region 49 Color
* @desc The color set for the region 49
* @default NONE
*
* @param Region 50 Color
* @desc The color set for the region 50
* @default NONE
*
* @param Region 51 Color
* @desc The color set for the region 51
* @default NONE
*
* @param Region 52 Color
* @desc The color set for the region 52
* @default NONE
*
* @param Region 53 Color
* @desc The color set for the region 53
* @default NONE
*
* @param Region 54 Color
* @desc The color set for the region 54
* @default NONE
*
* @param Region 55 Color
* @desc The color set for the region 55
* @default NONE
*
* @param Region 56 Color
* @desc The color set for the region 56
* @default NONE
*
* @param Region 57 Color
* @desc The color set for the region 57
* @default NONE
*
* @param Region 58 Color
* @desc The color set for the region 58
* @default NONE
*
* @param Region 59 Color
* @desc The color set for the region 59
* @default NONE
*
* @param Region 60 Color
* @desc The color set for the region 60
* @default NONE
*
* @param Region 61 Color
* @desc The color set for the region 61
* @default NONE
*
* @param Region 62 Color
* @desc The color set for the region 62
* @default NONE
*
* @param Region 63 Color
* @desc The color set for the region 63
* @default NONE
*
* @param Region 64 Color
* @desc The color set for the region 64
* @default NONE
*
* @param Region 65 Color
* @desc The color set for the region 65
* @default NONE
*
* @param Region 66 Color
* @desc The color set for the region 66
* @default NONE
*
* @param Region 67 Color
* @desc The color set for the region 67
* @default NONE
*
* @param Region 68 Color
* @desc The color set for the region 68
* @default NONE
*
* @param Region 69 Color
* @desc The color set for the region 69
* @default NONE
*
* @param Region 70 Color
* @desc The color set for the region 70
* @default NONE
*
* @param Region 71 Color
* @desc The color set for the region 71
* @default NONE
*
* @param Region 72 Color
* @desc The color set for the region 72
* @default NONE
*
* @param Region 73 Color
* @desc The color set for the region 73
* @default NONE
*
* @param Region 74 Color
* @desc The color set for the region 74
* @default NONE
*
* @param Region 75 Color
* @desc The color set for the region 75
* @default NONE
*
* @param Region 76 Color
* @desc The color set for the region 76
* @default NONE
*
* @param Region 77 Color
* @desc The color set for the region 77
* @default NONE
*
* @param Region 78 Color
* @desc The color set for the region 78
* @default NONE
*
* @param Region 79 Color
* @desc The color set for the region 79
* @default NONE
*
* @param Region 80 Color
* @desc The color set for the region 80
* @default NONE
*
* @param Region 81 Color
* @desc The color set for the region 81
* @default NONE
*
* @param Region 82 Color
* @desc The color set for the region 82
* @default NONE
*
* @param Region 83 Color
* @desc The color set for the region 83
* @default NONE
*
* @param Region 84 Color
* @desc The color set for the region 84
* @default NONE
*
* @param Region 85 Color
* @desc The color set for the region 85
* @default NONE
*
* @param Region 86 Color
* @desc The color set for the region 86
* @default NONE
*
* @param Region 87 Color
* @desc The color set for the region 87
* @default NONE
*
* @param Region 88 Color
* @desc The color set for the region 88
* @default NONE
*
* @param Region 89 Color
* @desc The color set for the region 89
* @default NONE
*
* @param Region 90 Color
* @desc The color set for the region 90
* @default NONE
*
* @param Region 91 Color
* @desc The color set for the region 91
* @default NONE
*
* @param Region 92 Color
* @desc The color set for the region 92
* @default NONE
*
* @param Region 93 Color
* @desc The color set for the region 93
* @default NONE
*
* @param Region 94 Color
* @desc The color set for the region 94
* @default NONE
*
* @param Region 95 Color
* @desc The color set for the region 95
* @default NONE
*
* @param Region 96 Color
* @desc The color set for the region 96
* @default NONE
*
* @param Region 97 Color
* @desc The color set for the region 97
* @default NONE
*
* @param Region 98 Color
* @desc The color set for the region 98
* @default NONE
*
* @param Region 99 Color
* @desc The color set for the region 99
* @default NONE
*
* @param Region 100 Color
* @desc The color set for the region 100
* @default NONE
*
* @param Region 101 Color
* @desc The color set for the region 101
* @default NONE
*
* @param Region 102 Color
* @desc The color set for the region 102
* @default NONE
*
* @param Region 103 Color
* @desc The color set for the region 103
* @default NONE
*
* @param Region 104 Color
* @desc The color set for the region 104
* @default NONE
*
* @param Region 105 Color
* @desc The color set for the region 105
* @default NONE
*
* @param Region 106 Color
* @desc The color set for the region 106
* @default NONE
*
* @param Region 107 Color
* @desc The color set for the region 107
* @default NONE
*
* @param Region 108 Color
* @desc The color set for the region 108
* @default NONE
*
* @param Region 109 Color
* @desc The color set for the region 109
* @default NONE
*
* @param Region 110 Color
* @desc The color set for the region 110
* @default NONE
*
* @param Region 111 Color
* @desc The color set for the region 111
* @default NONE
*
* @param Region 112 Color
* @desc The color set for the region 112
* @default NONE
*
* @param Region 113 Color
* @desc The color set for the region 113
* @default NONE
*
* @param Region 114 Color
* @desc The color set for the region 114
* @default NONE
*
* @param Region 115 Color
* @desc The color set for the region 115
* @default NONE
*
* @param Region 116 Color
* @desc The color set for the region 116
* @default NONE
*
* @param Region 117 Color
* @desc The color set for the region 117
* @default NONE
*
* @param Region 118 Color
* @desc The color set for the region 118
* @default NONE
*
* @param Region 119 Color
* @desc The color set for the region 119
* @default NONE
*
* @param Region 120 Color
* @desc The color set for the region 120
* @default NONE
*
* @param Region 121 Color
* @desc The color set for the region 121
* @default NONE
*
* @param Region 122 Color
* @desc The color set for the region 122
* @default NONE
*
* @param Region 123 Color
* @desc The color set for the region 123
* @default NONE
*
* @param Region 124 Color
* @desc The color set for the region 124
* @default NONE
*
* @param Region 125 Color
* @desc The color set for the region 125
* @default NONE
*
* @param Region 126 Color
* @desc The color set for the region 126
* @default NONE
*
* @param Region 127 Color
* @desc The color set for the region 127
* @default NONE
*
* @param Region 128 Color
* @desc The color set for the region 128
* @default NONE
*
* @param Region 129 Color
* @desc The color set for the region 129
* @default NONE
*
* @param Region 130 Color
* @desc The color set for the region 130
* @default NONE
*
* @param Region 131 Color
* @desc The color set for the region 131
* @default NONE
*
* @param Region 132 Color
* @desc The color set for the region 132
* @default NONE
*
* @param Region 133 Color
* @desc The color set for the region 133
* @default NONE
*
* @param Region 134 Color
* @desc The color set for the region 134
* @default NONE
*
* @param Region 135 Color
* @desc The color set for the region 135
* @default NONE
*
* @param Region 136 Color
* @desc The color set for the region 136
* @default NONE
*
* @param Region 137 Color
* @desc The color set for the region 137
* @default NONE
*
* @param Region 138 Color
* @desc The color set for the region 138
* @default NONE
*
* @param Region 139 Color
* @desc The color set for the region 139
* @default NONE
*
* @param Region 140 Color
* @desc The color set for the region 140
* @default NONE
*
* @param Region 141 Color
* @desc The color set for the region 141
* @default NONE
*
* @param Region 142 Color
* @desc The color set for the region 142
* @default NONE
*
* @param Region 143 Color
* @desc The color set for the region 143
* @default NONE
*
* @param Region 144 Color
* @desc The color set for the region 144
* @default NONE
*
* @param Region 145 Color
* @desc The color set for the region 145
* @default NONE
*
* @param Region 146 Color
* @desc The color set for the region 146
* @default NONE
*
* @param Region 147 Color
* @desc The color set for the region 147
* @default NONE
*
* @param Region 148 Color
* @desc The color set for the region 148
* @default NONE
*
* @param Region 149 Color
* @desc The color set for the region 149
* @default NONE
*
* @param Region 150 Color
* @desc The color set for the region 150
* @default NONE
*
* @param Region 151 Color
* @desc The color set for the region 151
* @default NONE
*
* @param Region 152 Color
* @desc The color set for the region 152
* @default NONE
*
* @param Region 153 Color
* @desc The color set for the region 153
* @default NONE
*
* @param Region 154 Color
* @desc The color set for the region 154
* @default NONE
*
* @param Region 155 Color
* @desc The color set for the region 155
* @default NONE
*
* @param Region 156 Color
* @desc The color set for the region 156
* @default NONE
*
* @param Region 157 Color
* @desc The color set for the region 157
* @default NONE
*
* @param Region 158 Color
* @desc The color set for the region 158
* @default NONE
*
* @param Region 159 Color
* @desc The color set for the region 159
* @default NONE
*
* @param Region 160 Color
* @desc The color set for the region 160
* @default NONE
*
* @param Region 161 Color
* @desc The color set for the region 161
* @default NONE
*
* @param Region 162 Color
* @desc The color set for the region 162
* @default NONE
*
* @param Region 163 Color
* @desc The color set for the region 163
* @default NONE
*
* @param Region 164 Color
* @desc The color set for the region 164
* @default NONE
*
* @param Region 165 Color
* @desc The color set for the region 165
* @default NONE
*
* @param Region 166 Color
* @desc The color set for the region 166
* @default NONE
*
* @param Region 167 Color
* @desc The color set for the region 167
* @default NONE
*
* @param Region 168 Color
* @desc The color set for the region 168
* @default NONE
*
* @param Region 169 Color
* @desc The color set for the region 169
* @default NONE
*
* @param Region 170 Color
* @desc The color set for the region 170
* @default NONE
*
* @param Region 171 Color
* @desc The color set for the region 171
* @default NONE
*
* @param Region 172 Color
* @desc The color set for the region 172
* @default NONE
*
* @param Region 173 Color
* @desc The color set for the region 173
* @default NONE
*
* @param Region 174 Color
* @desc The color set for the region 174
* @default NONE
*
* @param Region 175 Color
* @desc The color set for the region 175
* @default NONE
*
* @param Region 176 Color
* @desc The color set for the region 176
* @default NONE
*
* @param Region 177 Color
* @desc The color set for the region 177
* @default NONE
*
* @param Region 178 Color
* @desc The color set for the region 178
* @default NONE
*
* @param Region 179 Color
* @desc The color set for the region 179
* @default NONE
*
* @param Region 180 Color
* @desc The color set for the region 180
* @default NONE
*
* @param Region 181 Color
* @desc The color set for the region 181
* @default NONE
*
* @param Region 182 Color
* @desc The color set for the region 182
* @default NONE
*
* @param Region 183 Color
* @desc The color set for the region 183
* @default NONE
*
* @param Region 184 Color
* @desc The color set for the region 184
* @default NONE
*
* @param Region 185 Color
* @desc The color set for the region 185
* @default NONE
*
* @param Region 186 Color
* @desc The color set for the region 186
* @default NONE
*
* @param Region 187 Color
* @desc The color set for the region 187
* @default NONE
*
* @param Region 188 Color
* @desc The color set for the region 188
* @default NONE
*
* @param Region 189 Color
* @desc The color set for the region 189
* @default NONE
*
* @param Region 190 Color
* @desc The color set for the region 190
* @default NONE
*
* @param Region 191 Color
* @desc The color set for the region 191
* @default NONE
*
* @param Region 192 Color
* @desc The color set for the region 192
* @default NONE
*
* @param Region 193 Color
* @desc The color set for the region 193
* @default NONE
*
* @param Region 194 Color
* @desc The color set for the region 194
* @default NONE
*
* @param Region 195 Color
* @desc The color set for the region 195
* @default NONE
*
* @param Region 196 Color
* @desc The color set for the region 196
* @default NONE
*
* @param Region 197 Color
* @desc The color set for the region 197
* @default NONE
*
* @param Region 198 Color
* @desc The color set for the region 198
* @default NONE
*
* @param Region 199 Color
* @desc The color set for the region 199
* @default NONE
*
* @param Region 200 Color
* @desc The color set for the region 200
* @default NONE
*
* @param Region 201 Color
* @desc The color set for the region 201
* @default NONE
*
* @param Region 202 Color
* @desc The color set for the region 202
* @default NONE
*
* @param Region 203 Color
* @desc The color set for the region 203
* @default NONE
*
* @param Region 204 Color
* @desc The color set for the region 204
* @default NONE
*
* @param Region 205 Color
* @desc The color set for the region 205
* @default NONE
*
* @param Region 206 Color
* @desc The color set for the region 206
* @default NONE
*
* @param Region 207 Color
* @desc The color set for the region 207
* @default NONE
*
* @param Region 208 Color
* @desc The color set for the region 208
* @default NONE
*
* @param Region 209 Color
* @desc The color set for the region 209
* @default NONE
*
* @param Region 210 Color
* @desc The color set for the region 210
* @default NONE
*
* @param Region 211 Color
* @desc The color set for the region 211
* @default NONE
*
* @param Region 212 Color
* @desc The color set for the region 212
* @default NONE
*
* @param Region 213 Color
* @desc The color set for the region 213
* @default NONE
*
* @param Region 214 Color
* @desc The color set for the region 214
* @default NONE
*
* @param Region 215 Color
* @desc The color set for the region 215
* @default NONE
*
* @param Region 216 Color
* @desc The color set for the region 216
* @default NONE
*
* @param Region 217 Color
* @desc The color set for the region 217
* @default NONE
*
* @param Region 218 Color
* @desc The color set for the region 218
* @default NONE
*
* @param Region 219 Color
* @desc The color set for the region 219
* @default NONE
*
* @param Region 220 Color
* @desc The color set for the region 220
* @default NONE
*
* @param Region 221 Color
* @desc The color set for the region 221
* @default NONE
*
* @param Region 222 Color
* @desc The color set for the region 222
* @default NONE
*
* @param Region 223 Color
* @desc The color set for the region 223
* @default NONE
*
* @param Region 224 Color
* @desc The color set for the region 224
* @default NONE
*
* @param Region 225 Color
* @desc The color set for the region 225
* @default NONE
*
* @param Region 226 Color
* @desc The color set for the region 226
* @default NONE
*
* @param Region 227 Color
* @desc The color set for the region 227
* @default NONE
*
* @param Region 228 Color
* @desc The color set for the region 228
* @default NONE
*
* @param Region 229 Color
* @desc The color set for the region 229
* @default NONE
*
* @param Region 230 Color
* @desc The color set for the region 230
* @default NONE
*
* @param Region 231 Color
* @desc The color set for the region 231
* @default NONE
*
* @param Region 232 Color
* @desc The color set for the region 232
* @default NONE
*
* @param Region 233 Color
* @desc The color set for the region 233
* @default NONE
*
* @param Region 234 Color
* @desc The color set for the region 234
* @default NONE
*
* @param Region 235 Color
* @desc The color set for the region 235
* @default NONE
*
* @param Region 236 Color
* @desc The color set for the region 236
* @default NONE
*
* @param Region 237 Color
* @desc The color set for the region 237
* @default NONE
*
* @param Region 238 Color
* @desc The color set for the region 238
* @default NONE
*
* @param Region 239 Color
* @desc The color set for the region 239
* @default NONE
*
* @param Region 240 Color
* @desc The color set for the region 240
* @default NONE
*
* @param Region 241 Color
* @desc The color set for the region 241
* @default NONE
*
* @param Region 242 Color
* @desc The color set for the region 242
* @default NONE
*
* @param Region 243 Color
* @desc The color set for the region 243
* @default NONE
*
* @param Region 244 Color
* @desc The color set for the region 244
* @default NONE
*
* @param Region 245 Color
* @desc The color set for the region 245
* @default NONE
*
* @param Region 246 Color
* @desc The color set for the region 246
* @default NONE
*
* @param Region 247 Color
* @desc The color set for the region 247
* @default NONE
*
* @param Region 248 Color
* @desc The color set for the region 248
* @default NONE
*
* @param Region 249 Color
* @desc The color set for the region 249
* @default NONE
*
* @param Region 250 Color
* @desc The color set for the region 250
* @default NONE
*
* @param Region 251 Color
* @desc The color set for the region 251
* @default NONE
*
* @param Region 252 Color
* @desc The color set for the region 252
* @default NONE
*
* @param Region 253 Color
* @desc The color set for the region 253
* @default NONE
*
* @param Region 254 Color
* @desc The color set for the region 254
* @default NONE
*
* @param Region 255 Color
* @desc The color set for the region 255
* @default NONE
* 
* @help
* This plugin will display a  mini-map for your game.
*
* Custom Name Location - This parameter lets you define the
* location of the minimaps name display.
* 
* Possible locations:
* ABOVE, TOP, MID, BOTTOM, BELOW, ABOVERIGHT, TOPRIGHT, MIDRIGHT,
* BOTTOMRIGHT, BELOWRIGHT, ABOVELEFT, TOPLEFT, MIDLEFT,
* BOTTOMLEFT, BELOWLEFT
*
* NOTE TAGS
* In map properties, if you add <mm_areaname: Name> to the notes (Where
* Name is the name of the area), you'll set the display name for the
* mini map.
*
* If you want an event to be displayed on the minimap, you can type
* this in the events note tag.
* <mm_setColor: rgba(0, 255, 0, 0.8)>
* Alternatively, you can use rgb and hex as a color source as well.
* 
* PLUGIN COMMANDS
* upp_minimap - set values to show / hide to hide or show the minimap.
* || Example:
* ||  upp_minimap show
*
* upp_m_useCM - This decides rather or not to use the default
* 				Collision Mapping or strictly use region drawing.
* || Example:
* ||  upp_m_useCM true
* 
* || Example:
* ||  upp_m_hideEventDrawing 1
* 
* upp_m_showplayer - set values to true / false to hide or show the player.
* || Example:
* ||  upp_m_showplayer true
* 
* upp_m_showEvents - set values to true / false to hide or show the events.
* || Example:
* ||  upp_m_showEvents true
*
* upp_m_border - set values to true / false to hide or show the border
* || Example:
* ||  upp_m_border true
*
* upp_m_name - Setting this to true/false will show or hide the minimap
* display name, however, using the set option, you can change the area
* name display.
* || Example:
* ||  upp_m_border true
* ||  upp_m_border set Map Name
* 
* upp_m_setScale - sets the minimap size.
* || Example:
* ||  upp_m_setScale 5
* 
* upp_m_setZoom - sets the minimap zoom size.
* || Example:
* ||  upp_m_setZoom 10
* 
* upp_m_changeImpassColor - Changes the impassable tile color.
* || Example:
* ||  upp_m_changeImpassColor #11aaff
* ||  upp_m_changeImpassColor rgb(25, 150, 255)
* ||  upp_m_changeImpassColor rgba(25, 150, 255, 0.5);
* 
* upp_m_changePassColor - Changes the passable tile color.
* || Example:
* ||  upp_m_changePassColor #11aaff
* ||  upp_m_changePassColor rgb(25, 150, 255)
* ||  upp_m_changePassColor rgba(25, 150, 255, 0.5);
* 
* upp_m_relocate - Relocates the minimap.
* || Example:
* ||  upp_m_relocate 24 24
* 
* upp_m_namePosition - Changes where the minimap name is drawn.
* || Example:
* ||  upp_m_namePosition TOP
* 
* upp_m_nameOffset - Changes the map names X/Y Offset.
* || Example:
* ||  upp_m_nameOffset 24 24
*  
* upp_m_nameBGColor - Changes the BG color of the name window.
* || Example:
* ||  upp_m_nameBGColor #11aaff;
* ||  upp_m_nameBGColor rgb(25, 150, 255);
* ||  upp_m_nameBGColor rgba(25, 150, 255, 0.5);
*  
* upp_m_setRegion - Changes the color of the specified region ID.
* || Example:
* ||  upp_m_setRegion 1 color #11aaff;
* ||  upp_m_setRegion 1 color rgb(25, 150, 255);
* ||  upp_m_setRegion 1 color rgba(25, 150, 255, 0.5);
*
* upp_m_regionClear - you can clear a range of regions, clear a
* 					  single region, or clear all the regions to
* 					  stop them from being drawn on the minimap.
* || Example:
* ||  upp_m_regionClear single 1
* ||  upp_m_regionClear range 1 4
* ||  upp_m_regionClear all
* 
* upp_m_hideEventDrawing - Hides the event from the minimap by setting
* 						   its color to rgba(0, 0, 0, 0).
* || Example:
* ||  upp_m_hideEventDrawing 1
*
* 
* upp_m_playerCircle - Setting this to true/false will set if the player
* 					   icon is a circle or a square.
* || Example:
* ||  upp_m_playerCircle true
* 
* upp_m_eventCircle - Same thing as upp_m_playerCircle, only with events.
*
* upp_m_setBeacon - Use this to turn an event into a blinking beacon.
*                   Order: upp_m_setBeacon eventId show expand_speed
*                   start_opacity opacity_fade_speed delay
* || Example:
* ||  upp_m_setBeacon 2 true 0.2 255 4 60
*
* upp_m_changePlayerColor - Changes the color of the player indicator.
* || Example:
* ||  upp_m_changePlayerColor rgba(150, 255, 255, 0.5)
* 
* upp_m_changeEventColor - Changes the color of the event.
* || Example:
* ||  upp_m_changeEventColor 1 rgba(150, 255, 255, 0.5)
*
* REGION COLORS:
* By default, the region colors are set to NONE which makes the map
* not render them. Simply change NONE to a hex color, rgb, or rgba.
* Example: rgba(0, 0, 0, 0.5)
*
* There are a total of 255 regions, so be sure to use ones that you
* aren't already using for other scripts, or at least find a way to
* make them co-exist if you want to add a little extra detail to your
* mini-maps.
*
*/
var _pminiParams = PluginManager.parameters('UPP_MiniMap');
var _pminiMap_X 				= Number(_pminiParams['Minimap X']);
var _pminiMap_Y 				= Number(_pminiParams['Minimap Y']);
var _pminiMap_Width			    = _pminiParams['Minimap Size Base'];
var _pminiMap_useCM			    = _pminiParams['Use Collision Map'];
var _pminiMap_ZoomButton	    = _pminiParams['Minimap Zoom Button'];
var _pminiMap_playerColor 		= _pminiParams['Minimap Player Color'];
var _pminiMap_showPlayer		= _pminiParams['Show Player'];
var _pminiMap_ImpassColor		= _pminiParams['Impassable Color'];
var _pminiMap_PassColor			= _pminiParams['Passable Color'];
var _startMapHidden 			= _pminiParams['Hide Map At Start'];
var _miniBorderSize 			= Number(_pminiParams['Border Padding']);
var _drawMinimapBorder 			= _pminiParams['Draw Border'];
var _minimapshowCustomName		= _pminiParams['Display Custom Name'];
var _minimapNameXOffset			= Number(_pminiParams['Custom Name X Offset']);
var _minimapNameYOffset			= Number(_pminiParams['Custom Name Y Offset']);
var _minimapNameBorder			= _pminiParams['Custom Name Border'];
var _minimapNameSize			= _pminiParams['Custom Name Size'];
var _minimapNameColor			= _pminiParams['Custom Name Color'];
var _minimapNameBGColor			= _pminiParams['Custom Name BG'];
var _minimapNameWindowBG		= _pminiParams['Custom Name Show Window BG'];
var _minimapNameLocation		= _pminiParams['Custom Name Location'];
var _minimapNamePadding			= Number(_pminiParams['Custom Name Padding']);
var _minimapScaleZoom			= Number(_pminiParams['Minimap Scale Zoom']);
var _mm_eventCircles			= _pminiParams['Events Use Circle Indicator'];
var _mm_playerCircles			= _pminiParams['Player Uses Circle Indicator'];
var _mm_defaultEventColor		= _pminiParams['Default Event Indicator Color'];
var _mm_beaconBlinkPower		= Number(_pminiParams['Event Beacon Power']);
var _mm_beaconBlinkFadeSpeed	= Number(_pminiParams['Event Beacon Fade Speed']);
var _mm_beaconBlinkEnd			= Number(_pminiParams['Event Beacon Repeat']);
var _mm_beaconBlink = 0;
var _mm_beaconBlinkOpac = 255;
var _mm_beaconTimer = 0;
var _mm_showEvents = "true";
var _mm_defaultScale = _pminiMap_Width
var $miniMapWindow = null;
var $miniMapPlayer = null;
var $miniMapBorder = null;
var $miniMapName = null;
var _shownEvents = 0;
var _minimapEvents = [];
var $mm_updatedMapName = null;
var _mmRegionData = [];
for(i=0;i<256;i++)
{
	_mmRegionData[i] = _pminiParams['Region ' +i+ ' Color'];
}
function resetRegionData()
{
	for(i=0;i<256;i++)
	{
		_mmRegionData[i] = "NONE";
	}
}

var upp_miniMapCmds = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	upp_miniMapCmds.apply(this);
	
	if(command == 'upp_minimap')
	{
		if(args[0] == "hide")
		{
			$miniMapWindow.hide();
			$miniMapPlayer.hide();
			$miniMapBorder.hide();
			$miniMapName.hide();
			_startMapHidden = "true";
		}
		if(args[0] == "show")
		{
			$miniMapWindow.show();
			$miniMapPlayer.show();
			$miniMapBorder.show();
			$miniMapName.show();
			_startMapHidden = "false";
		}
	}
	
	if(command == 'upp_m_showplayer')
	{
		_pminiMap_showPlayer = args[0];
	}
	
	if(command == 'upp_m_showEvents')
	{
		_mm_showEvents = args[0];
	}
	
	if(command == 'upp_m_playerCircle')
	{
		_mm_playerCircles = args[0];
	}
	
	if(command == 'upp_m_eventCircle')
	{
		_mm_eventCircles = args[0];
	}
	
	if(command == 'upp_m_border')
	{
		if(args[0] == "false")
		{
			$miniMapBorder.opacity = 0;
		}
		if(args[0] == "true")
		{
			$miniMapBorder.opacity = 255;
		}
	}
	
	if(command == 'upp_m_borderPadding')
	{
		$miniMapBorder.padding = args[0];
	}
	
	if(command == 'upp_m_useCM')
	{
		_pminiMap_useCM = args[0];
		$miniMapWindow.refresh();
	}
	
	if(command == 'upp_m_name')
	{
		if(args[0] == "hide")
		{
			$miniMapName.hide()
		}
		if(args[0] == "show")
		{
			$miniMapName.show()
		}
		if(args[0] == "set")
		{
			$mm_updatedMapName = "";
			for(i=1;i<args.length;i++)
			{
				$mm_updatedMapName += args[i];
				if(i<args.length-1)
				{
					$mm_updatedMapName += " ";
				}
			}
			$miniMapName.refresh();
		}
	}
	
	if(command == 'upp_m_setScale')
	{
		_pminiMap_Width = args[0];
		_mm_defaultScale = args[0];
		$miniMapWindow.refresh();
		$miniMapBorder.refresh();
		$miniMapName.refresh();
	}
	
	if(command == 'upp_m_setZoom')
	{
		_minimapScaleZoom = args[0];
	}
	
	if(command == 'upp_m_changeImpassColor')
	{
		var string="";
		for(i=0;i<args.length;i++)
		{
			string += args[i];
			if(i<args.length-1)
			{
				string += " ";
			}
		}
		_pminiMap_ImpassColor = string;
		$miniMapBorder.refresh();
	}
	
	if(command == 'upp_m_changePassColor')
	{
		_pminiMap_PassColor = args[0];
		$miniMapWindow.refresh();
	}
	
	if(command == 'upp_m_relocate')
	{
		_pminiMap_X = args[0];
		_pminiMap_Y = args[1];
		$miniMapWindow.refresh();
		$miniMapBorder.refresh();
		$miniMapName.refresh();
	}
	
	if(command == 'upp_m_namePosition')
	{
		_minimapNameLocation = args[0];
		$miniMapName.refresh();
	}
	
	if(command == 'upp_m_nameOffset')
	{
		_minimapNameXOffset = args[0];
		_minimapNameYOffset = args[1];
		$miniMapName.refresh();
	}
	
	if(command == 'upp_m_nameBGColor')
	{
		var string="";
		for(i=0;i<args.length;i++)
		{
			string += args[i];
			if(i<args.length-1)
			{
				string += " ";
			}
		}
		_minimapNameBGColor = string
		$miniMapName.refresh();
	}
	
	if(command == 'upp_m_hideEventDrawing')
	{
		for(i=0;i<_shownEvents;i++)
		{
			if(_minimapEvents[i].id==args[0])
			{
				_minimapEvents[i].color = "rgba(0, 0, 0, 0)";
			}
		}
		$miniMapName.refresh();
	}
	
	if(command == 'upp_m_setBeacon')
	{
		for(i=0;i<_shownEvents;i++)
		{
			if(_minimapEvents[i].id==args[0])
			{
				_minimapEvents[i].beacon = eval(args[1]);
				_minimapEvents[i].beaconSpeed = Number(args[2]);
				_minimapEvents[i].beaconOpac = Number(args[3]);
				_minimapEvents[i].beaconFadeSpeed = Number(args[4]);
				_minimapEvents[i].beaconDelay = Number(args[5]);
				_minimapEvents[i].beaconCounter = 0;
				_minimapEvents[i].beaconBlink = 0;
			}
		}
	}
	
	if(command == 'upp_m_changePlayerColor')
	{
		var string="";
		for(i=0;i<args.length;i++)
		{
			string += args[i];
			if(i<args.length-1)
			{
				string += " ";
			}
		}
		_pminiMap_playerColor = string;
	}
	if(command == 'upp_m_changeEventColor')
	{
		var string="";
		for(i=1;i<args.length;i++)
		{
			string += args[i];
			if(i<args.length-1)
			{
				string += " ";
			}
		}
		for(i=0;i<_shownEvents;i++)
		{
			if(_minimapEvents[i].id==args[0])
			{
				_minimapEvents[i].color = string;
			}
		}
	}
	
	if(command == 'upp_m_setRegion')
	{
		var string="";
		for(i=1;i<args.length;i++)
		{
			string += args[i];
			if(i<args.length-1)
			{
				string += " ";
			}
		}
		_mmRegionData[args[0]] = string;
		$miniMapWindow.refresh();
	}
	if(command == 'upp_m_regionClear')
	{
		if(args[0] == "range")
		{
			for(i=args[1];i<args[2];i++)
			{
				_mmRegionData[i] = "NONE";
			}
		}
		if(args[0] == "all")
		{
			for(i=0;i<256;i++)
			{
				_mmRegionData[i] = "NONE";
			}
		}
		if(args[0] == "single")
		{
			_mmRegionData[args[1]] = "NONE";
		}
		$miniMapWindow.refresh();
	}
}

function checkMapNote(str) {
 
var temp = $dataMap.note.match("<" + str + " (.*)>");
return !!temp;
 
}

function getMapNote(str) {
 
var temp = $dataMap.note.match("<" + str + " (.*)>");
return temp[1];
 
}

function checkEventMeta(id, meta) {
 
var temp = $dataMap.events[id].note.match("<" + meta + " (.*)>");
return !!temp;
 
}

function getEventMeta(id, meta) {
 
var temp = $dataMap.events[id].note.match("<" + meta + " (.*)>");
return temp[1];
 
}

function Window_Minimap() {
    this.initialize.apply(this, arguments);
}

Window_Minimap.prototype = Object.create(Window_Selectable.prototype);
Window_Minimap.prototype.constructor = Window_Minimap;

Window_Minimap.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
	if(_startMapHidden == "true") { this.hide(); }
	this.opacity = 0;
    this.refresh();
    this.activate();
	$miniMapWindow = this;
};

Window_Minimap.prototype.standardPadding = function() {
    return 0;
};

Window_Minimap.prototype.refresh = function()
{
	this.contents.clear();
	this.createContents();
	this.x = _pminiMap_X;
	this.y = _pminiMap_Y;
	this.width = _pminiMap_Width*$dataMap.width+_miniBorderSize*2;
	this.height = _pminiMap_Width*$dataMap.height+_miniBorderSize*2;
	this.createContents();
	var RES_X = _pminiMap_X;
	var RES_Y = _pminiMap_Y;
	var RES_W = _pminiMap_Width;
	var MAP_W = $dataMap.width;
	var MAP_H = $dataMap.height;
	for(i=0;i<$dataMap.width;i++)
	{
		for(i2=0;i2<$dataMap.height;i2++)
		{
			var pl_x = (RES_W*i);
			var pl_y = (RES_W*i2);
			
			if(_pminiMap_useCM == "true")
			{
				if($gameMap.checkPassage(i, i2, 0x0F) == true)
				{
					this.contents.fillRect(pl_x, pl_y, RES_W, RES_W, _pminiMap_PassColor);
				}
			}
			if(_mmRegionData[$gameMap.regionId(i, i2)] != "NONE")
			{
				this.contents.fillRect(pl_x, pl_y, RES_W, RES_W, _mmRegionData[$gameMap.regionId(i, i2)])
			}
		}
	}
};

function PLAYER_LOCATOR() {
    this.initialize.apply(this, arguments);
}

PLAYER_LOCATOR.prototype = Object.create(Window_Selectable.prototype);
PLAYER_LOCATOR.prototype.constructor = PLAYER_LOCATOR;

PLAYER_LOCATOR.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
	if(_startMapHidden == "true") { this.hide(); }
	this.opacity = 0;
    this.refresh();
    this.activate();
	$miniMapPlayer = this;
};

PLAYER_LOCATOR.prototype.standardPadding = function() {
    return 0;
};

PLAYER_LOCATOR.prototype.refresh = function()
{
	this.contents.clear();
	this.x = _pminiMap_X;
	this.y = _pminiMap_Y;
	this.width = _pminiMap_Width*$dataMap.width+_miniBorderSize*2;
	this.height = _pminiMap_Width*$dataMap.height+_miniBorderSize*2;
	var RES_X = _pminiMap_X;
	var RES_Y = _pminiMap_Y;
	var RES_W = _pminiMap_Width;
	var MAP_W = $dataMap.width;
	var MAP_H = $dataMap.height; 
	if(_pminiMap_showPlayer == "true")
	{
		switch(_mm_playerCircles)
		{
			case "false":
				this.contents.fillRect($gamePlayer.x * RES_W, $gamePlayer.y * RES_W, RES_W, RES_W, _pminiMap_playerColor);
			break;
			case "true":
				this.contents.drawCircle($gamePlayer.x * RES_W+(RES_W/2), $gamePlayer.y * RES_W+(RES_W/2), RES_W/2, _pminiMap_playerColor);
			break;
		}
	}
	if(_mm_showEvents == "true")
	{
		for(i=0;i<_minimapEvents.length;i++)
		{
			if(_minimapEvents[i].beacon==true)
			{
				this.contents.paintOpacity=_minimapEvents[i].beaconOpac;
				this.contents.drawCircle(_minimapEvents[i].x * RES_W+(RES_W/2), _minimapEvents[i].y * RES_W+(RES_W/2), _minimapEvents[i].beaconBlink, _minimapEvents[i].color)
				this.contents.paintOpacity=255;
				_minimapEvents[i].beaconBlink+=_minimapEvents[i].beaconSpeed;
				_minimapEvents[i].beaconOpac-=_minimapEvents[i].beaconFadeSpeed;
				_minimapEvents[i].beaconOpac=Math.min(Math.max(_minimapEvents[i].beaconOpac, 0), 255);
				_minimapEvents[i].beaconCounter+=1;
				_minimapEvents[i].beaconBlink = (_minimapEvents[i].beaconCounter >= _minimapEvents[i].beaconDelay) ? 0:_minimapEvents[i].beaconBlink;
				_minimapEvents[i].beaconOpac = (_minimapEvents[i].beaconCounter >= _minimapEvents[i].beaconDelay) ? 255:_minimapEvents[i].beaconOpac;
				_minimapEvents[i].beaconCounter = (_minimapEvents[i].beaconCounter >= _minimapEvents[i].beaconDelay) ? 0:_minimapEvents[i].beaconCounter;
			}
			switch(_mm_eventCircles)
			{
				case "false":
					this.contents.fillRect(_minimapEvents[i].x * RES_W, _minimapEvents[i].y * RES_W, RES_W, RES_W, _minimapEvents[i].color);
				break;
				case "true":
					this.contents.drawCircle(_minimapEvents[i].x * RES_W+(RES_W/2), _minimapEvents[i].y * RES_W+(RES_W/2), RES_W/2, _minimapEvents[i].color)
				break;
			}
		}
	}
};

PLAYER_LOCATOR.prototype.update = function()
{
	this.refresh();
}

function BORDER_WINDOW() {
    this.initialize.apply(this, arguments);
}

BORDER_WINDOW.prototype = Object.create(Window_Selectable.prototype);
BORDER_WINDOW.prototype.constructor = BORDER_WINDOW;

BORDER_WINDOW.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, _pminiMap_X-_miniBorderSize, _pminiMap_X-_miniBorderSize, _pminiMap_Width*$dataMap.width+_miniBorderSize*2, _pminiMap_Width*$dataMap.height+_miniBorderSize*2);
	if(_startMapHidden == "true") { this.hide(); }
	this.opacity = 255;
	this.backOpacity=0;
    this.refresh();
    this.activate();
	$miniMapBorder = this;
};

BORDER_WINDOW.prototype.standardPadding = function() {
    return 4;
};

BORDER_WINDOW.prototype.refresh = function()
{
	this.x = _pminiMap_X-_miniBorderSize;
	this.y = _pminiMap_Y-_miniBorderSize;
	this.width = _pminiMap_Width*$dataMap.width+_miniBorderSize*2;
	this.height = _pminiMap_Width*$dataMap.height+_miniBorderSize*2;
	this.createContents();
	this.contents.fillRect(0, 0, this.contents.width-0, this.contents.height-0, _pminiMap_ImpassColor);
};



function NAME_DISPLAY() {
    this.initialize.apply(this, arguments);
}

NAME_DISPLAY.prototype = Object.create(Window_Selectable.prototype);
NAME_DISPLAY.prototype.constructor = NAME_DISPLAY;

NAME_DISPLAY.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, _pminiMap_Width*$dataMap.width+_minimapNamePadding, this.fittingHeight(1)+_minimapNamePadding);
	if(_startMapHidden == "true") { this.hide(); }
	if(_minimapNameBorder=="false")
	{
		this.opacity = 0;
	} else {
		this.opacity=255;
	}
	if(_minimapNameWindowBG == "false")
	{
		this.backOpacity=0;
	} else {
		this.backOpacity=this.standardBackOpacity();
	}
    this.refresh();
    this.activate();
	$miniMapName = this;
};

NAME_DISPLAY.prototype.standardPadding = function() {
    return _minimapNamePadding;
};

NAME_DISPLAY.prototype.refresh = function()
{
	this.width = _pminiMap_Width*$dataMap.width+_minimapNamePadding*2;
	this.updateLocation(_minimapNameLocation);
	this.createContents();
	this.contents.clear();
	var RES_X = 0;
	var RES_Y = 0;
	var RES_W = _pminiMap_Width;
	var MAP_W = $dataMap.width;
	var MAP_H = $dataMap.height;
	this.contents.fillRect(RES_X, RES_Y, RES_W*MAP_W, this.contents.height, _minimapNameBGColor);
	this.changeTextColor(_minimapNameColor);
	this.contents.fontSize = _minimapNameSize;
	if(checkMapNote("mm_areaname:") == true && $mm_updatedMapName=="")
	{
		this.contents.drawText($dataMap.note.match(/<mm_areaname: (.*)>/)[1], RES_X, RES_Y, RES_W*MAP_W-_minimapNamePadding, this.lineHeight(), 'center');
	} else {
		this.contents.drawText($mm_updatedMapName, RES_X, RES_Y, RES_W*MAP_W-_minimapNamePadding, this.lineHeight(), 'center');
	}
};

NAME_DISPLAY.prototype.updateLocation = function(sect)
{
	var RES_X = Number(_pminiMap_X)+Number(_minimapNameXOffset);
	var RES_Y = Number(_pminiMap_Y)+Number(_minimapNameYOffset);
	var RES_W = _pminiMap_Width;
	var MAP_W = $dataMap.width;
	var MAP_H = $dataMap.height;
	switch(sect)
	{
		case "TOP":
			this.x=RES_X-_minimapNamePadding/2-_minimapNamePadding/2;
			this.y=RES_Y;
		break;
		case "MID":
			this.x=RES_X-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*($dataMap.height/2)-(this.height/2)-(_minimapNamePadding/2);
		break;
		case "BOTTOM":
			this.x=RES_X-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*$dataMap.height-this.height-_minimapNamePadding/2;
		break;
		case "ABOVE":
			this.x=RES_X-_minimapNamePadding/2;
			this.y=RES_Y-this.height-_minimapNamePadding/2;
		break;
		case "BELOW":
			this.x=RES_X-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*$dataMap.height-_minimapNamePadding/2;
		break;
		case "TOPRIGHT":
			this.x=RES_X+this.width-_minimapNamePadding/2;
			this.y=RES_Y-_minimapNamePadding/2;
		break;
		case "MIDRIGHT":
			this.x=RES_X+this.width-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*$dataMap.height/2-this.height/2-_minimapNamePadding/2;
		break;
		case "BOTTOMRIGHT":
			this.x=RES_X+this.width-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*$dataMap.height-this.height-_minimapNamePadding/2;
		break;
		case "ABOVERIGHT":
			this.x=RES_X+this.width-_minimapNamePadding/2;
			this.y=RES_Y-this.height-_minimapNamePadding/2;
		break;
		case "BELOWRIGHT":
			this.x=RES_X+this.width-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*$dataMap.height-_minimapNamePadding/2;
		break;
		case "TOPLEFT":
			this.x=RES_X-this.width-_minimapNamePadding/2;
			this.y=RES_Y-_minimapNamePadding/2;
		break;
		case "MIDLEFT":
			this.x=RES_X-this.width-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*$dataMap.height/2-this.height/2-_minimapNamePadding/2;
		break;
		case "BOTTOMLEFT":
			this.x=RES_X-this.width-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*$dataMap.height-this.height-_minimapNamePadding/2;
		break;
		case "ABOVELEFT":
			this.x=RES_X-this.width-_minimapNamePadding/2;
			this.y=RES_Y-this.height-_minimapNamePadding/2;
		break;
		case "BELOWLEFT":
			this.x=RES_X-this.width-_minimapNamePadding/2;
			this.y=RES_Y+_pminiMap_Width*$dataMap.height-_minimapNamePadding/2;
		break;
	}
};

var WIN_MMAP_AL1 = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    this.createMinimap();
	WIN_MMAP_AL1.call(this);
};
var mm_smInit = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function()
{
	mm_smInit.call(this);
	this.tmp = 0;
}
Scene_Map.prototype.createMinimap = function()
{
	this.tmp =_mm_defaultScale
	$mm_updatedMapName = "";
	this._mmBorderWindow = new BORDER_WINDOW();
	this._miniMap = new Window_Minimap();
	this._playerDisplay = new PLAYER_LOCATOR();
	this._mmNameWindow = new NAME_DISPLAY();
	this.addChild(this._mmBorderWindow);
    this.addChild(this._miniMap);
	this.addChild(this._playerDisplay);
	this.addChild(this._mmNameWindow);
	this.setChildIndex(this._mmBorderWindow, 1);
	this.setChildIndex(this._miniMap, 2);
	this.setChildIndex(this._playerDisplay, 3);
	this.setChildIndex(this._mmNameWindow, 4);
	_shownEvents=0;
	_minimapEvents = [];
	for(i=0;i<$gameMap._events.length;i++)
	{
		if($dataMap.events[i])
		{
			if(checkEventMeta(i, "mm_setColor:"))
			{
				_minimapEvents[_shownEvents] = $gameMap._events[i];
				_minimapEvents[_shownEvents].color = getEventMeta(i, "mm_setColor:");
				_minimapEvents[_shownEvents].id = i;
				_shownEvents+=1;
			}
		}
	}
}
var scaleZoom=false;
var mm_smUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function()
{
	mm_smUpdate.call(this);
	if(_pminiMap_ZoomButton != "none" && Input.isTriggered(_pminiMap_ZoomButton))
	{
		if(scaleZoom==false)
		{
			_pminiMap_Width = _minimapScaleZoom;
			$miniMapWindow.refresh();
			$miniMapBorder.refresh();
			$miniMapName.refresh();
		} else {
			_pminiMap_Width = this.tmp
			$miniMapWindow.refresh();
			$miniMapBorder.refresh();
			$miniMapName.refresh();
		}
		scaleZoom = !scaleZoom;
	}
}

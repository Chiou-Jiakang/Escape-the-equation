const puzzlePools = {
  blackboard: [
    {
      title: "黑板上的雙重方程",
      question:
        "黑板上的粉筆字突然亮起：\n\n2a + 5 = 17，b - a = 4。\n\nCode Fragment = ab。\n\n請輸入這段密碼片段。",
      answer: "610",
      hint: "先求出 a = 6，再用 b - a = 4 求出 b = 10。最後把 a 和 b 直接連在一起。",
      fragmentName: "黑板片段",
    },
    {
      title: "黑板上的代數鎖",
      question:
        "黑板浮現兩條線索：\n\n4x - 3 = 17，y = x + 7。\n\nCode Fragment = yx。\n\n請輸入這段密碼片段。",
      answer: "125",
      hint: "先求 x = 5，再算 y = 12。Code Fragment = yx，所以是 12 接 5。",
      fragmentName: "黑板片段",
    },
    {
      title: "粉筆留下的座號",
      question:
        "黑板中央寫著：\n\n3m + 2 = 20，n = 2m - 1。\n\nCode Fragment = mn。\n\n請輸入這段密碼片段。",
      answer: "611",
      hint: "先求 m = 6，再算 n = 11。Code Fragment = mn，所以是 6 接 11。",
      fragmentName: "黑板片段",
    },
    {
      title: "被擦掉一半的公式",
      question:
        "黑板上殘留著兩行字：\n\n5p - 8 = 37，q = p - 5。\n\nCode Fragment = pq。\n\n請輸入這段密碼片段。",
      answer: "94",
      hint: "5p - 8 = 37，所以 p = 9。q = 9 - 5 = 4。Code Fragment = pq。",
      fragmentName: "黑板片段",
    },
    {
      title: "黑板角落的雙數字",
      question:
        "黑板角落寫著：\n\nr ÷ 3 + 4 = 10，s = r + 10。\n\nCode Fragment = rs。\n\n請輸入這段密碼片段。",
      answer: "1828",
      hint: "r ÷ 3 = 6，所以 r = 18。s = 28。Code Fragment = rs。",
      fragmentName: "黑板片段",
    },
    {
      title: "粉筆圈起的未知數",
      question:
        "黑板上有一個被圈起來的提示：\n\n7u + 1 = 50，v = 3u。\n\nCode Fragment = vu。\n\n請輸入這段密碼片段。",
      answer: "217",
      hint: "u = 7，v = 21。Code Fragment = vu，所以是 21 接 7。",
      fragmentName: "黑板片段",
    },
    {
      title: "黑板下方的密碼式",
      question:
        "黑板下方刻著：\n\n2c + 9 = 31，d = c - 4。\n\nCode Fragment = cd。\n\n請輸入這段密碼片段。",
      answer: "117",
      hint: "c = 11，d = 7。Code Fragment = cd。",
      fragmentName: "黑板片段",
    },
    {
      title: "斷裂的等式",
      question:
        "黑板上出現兩個斷裂的等式：\n\n6h - 12 = 42，k = h + 8。\n\nCode Fragment = kh。\n\n請輸入這段密碼片段。",
      answer: "179",
      hint: "h = 9，k = 17。Code Fragment = kh。",
      fragmentName: "黑板片段",
    },
    {
      title: "黑板中央的連鎖式",
      question:
        "黑板中央寫著：\n\n9t + 6 = 87，w = t × 4。\n\nCode Fragment = wt。\n\n請輸入這段密碼片段。",
      answer: "369",
      hint: "t = 9，w = 36。Code Fragment = wt。",
      fragmentName: "黑板片段",
    },
    {
      title: "被鎖住的變數",
      question:
        "黑板上出現一組鎖鏈符號：\n\n8z - 5 = 59，y = z + 12。\n\nCode Fragment = zy。\n\n請輸入這段密碼片段。",
      answer: "820",
      hint: "z = 8，y = 20。Code Fragment = zy。",
      fragmentName: "黑板片段",
    },
    {
      title: "粉筆灰中的密碼",
      question:
        "粉筆灰裡浮出：\n\n4g + 11 = 43，j = g + 6。\n\nCode Fragment = gj。\n\n請輸入這段密碼片段。",
      answer: "814",
      hint: "g = 8，j = 14。Code Fragment = gj。",
      fragmentName: "黑板片段",
    },
    {
      title: "黑板的反向指令",
      question:
        "黑板寫著一條反向指令：\n\n12 - 2e = -6，f = e + 5。\n\nCode Fragment = fe。\n\n請輸入這段密碼片段。",
      answer: "149",
      hint: "12 - 2e = -6，所以 e = 9。f = 14。Code Fragment = fe。",
      fragmentName: "黑板片段",
    },
    {
      title: "黑板上的二段密碼",
      question:
        "黑板顯示：\n\n3a - 4 = 23，b = a × 2。\n\nCode Fragment = ba。\n\n請輸入這段密碼片段。",
      answer: "189",
      hint: "a = 9，b = 18。Code Fragment = ba。",
      fragmentName: "黑板片段",
    },
    {
      title: "粉筆邊界的提示",
      question:
        "黑板邊界寫著：\n\n5n + 15 = 65，m = n - 3。\n\nCode Fragment = nm。\n\n請輸入這段密碼片段。",
      answer: "107",
      hint: "n = 10，m = 7。Code Fragment = nm。",
      fragmentName: "黑板片段",
    },
    {
      title: "最後一行粉筆字",
      question:
        "黑板最下方浮現：\n\n2x + 18 = 40，y = x + 9。\n\nCode Fragment = xy。\n\n請輸入這段密碼片段。",
      answer: "1120",
      hint: "x = 11，y = 20。Code Fragment = xy。",
      fragmentName: "黑板片段",
    },
  ],

  desk: [
    {
      title: "書桌抽屜的配方紙",
      question:
        "上鎖的書桌裡夾著一張配方紙：\n\n紅色液體 : 藍色液體 = 3 : 2。\n混合液總量是 250 ml。\n\n抽屜密碼是紅色液體的毫升數。\n\n請輸入密碼。",
      answer: "150",
      hint: "總比例是 3 + 2 = 5 份。紅色液體佔 3 份，所以是 250 × 3/5。",
      fragmentName: "書桌片段",
    },
    {
      title: "抽屜裡的折扣單",
      question:
        "抽屜裡有一張奇怪的收據：\n\n原價 800 元，打 75 折。\n\n收據下方寫著：付款金額就是片段。\n\n請輸入付款金額。",
      answer: "600",
      hint: "75 折代表 0.75，所以付款金額是 800 × 0.75。",
      fragmentName: "書桌片段",
    },
    {
      title: "書桌上的比例尺",
      question:
        "桌上有一張縮小地圖：\n\n地圖距離 : 實際距離 = 1 : 40。\n地圖上量到 12 cm。\n\n密碼是實際距離的 cm 數。\n\n請輸入密碼。",
      answer: "480",
      hint: "實際距離是 12 × 40。",
      fragmentName: "書桌片段",
    },
    {
      title: "墨水瓶的濃度標籤",
      question:
        "桌上的墨水瓶標著：\n\n總量 300 ml，其中 35% 是黑色濃縮液。\n\n密碼是黑色濃縮液的 ml 數。\n\n請輸入密碼。",
      answer: "105",
      hint: "300 × 0.35 = 105。",
      fragmentName: "書桌片段",
    },
    {
      title: "抽屜密碼的分配規則",
      question:
        "抽屜裡寫著：\n\nA : B = 5 : 7。\nA + B = 240。\n\n密碼是 B 的值。\n\n請輸入密碼。",
      answer: "140",
      hint: "總共 12 份，B 佔 7 份，所以 B = 240 × 7/12。",
      fragmentName: "書桌片段",
    },
    {
      title: "便條紙上的稅率",
      question:
        "書桌便條寫著：\n\n商品原價 1200 元，加上 5% 服務費。\n\n密碼是最後總金額。\n\n請輸入密碼。",
      answer: "1260",
      hint: "1200 × 1.05 = 1260。",
      fragmentName: "書桌片段",
    },
    {
      title: "紙盒裡的糖果比例",
      question:
        "紙盒裡有糖果比例：\n\n紅糖 : 藍糖 = 4 : 5。\n總共有 180 顆。\n\n密碼是藍糖數量。\n\n請輸入密碼。",
      answer: "100",
      hint: "總共 9 份，藍糖佔 5 份，所以是 180 × 5/9。",
      fragmentName: "書桌片段",
    },
    {
      title: "書桌上的打折密碼",
      question:
        "桌上收據顯示：\n\n原價 960 元，打 8 折。\n\n密碼是折扣後價格。\n\n請輸入密碼。",
      answer: "768",
      hint: "8 折代表 0.8，所以 960 × 0.8。",
      fragmentName: "書桌片段",
    },
    {
      title: "抽屜裡的速度紙條",
      question:
        "抽屜紙條寫著：\n\n一個裝置每分鐘輸出 45 個訊號。\n運作 8 分鐘後停止。\n\n密碼是總訊號數。\n\n請輸入密碼。",
      answer: "360",
      hint: "45 × 8 = 360。",
      fragmentName: "書桌片段",
    },
    {
      title: "桌面上的能量條",
      question:
        "桌面上的能量條顯示：\n\n最大能量 500 單位，目前剩下 64%。\n\n密碼是目前能量值。\n\n請輸入密碼。",
      answer: "320",
      hint: "500 × 0.64 = 320。",
      fragmentName: "書桌片段",
    },
    {
      title: "藥水混合比例",
      question:
        "桌上的藥水標籤寫著：\n\n甲液 : 乙液 = 2 : 3。\n總量 450 ml。\n\n密碼是甲液 ml 數。\n\n請輸入密碼。",
      answer: "180",
      hint: "總共 5 份，甲液佔 2 份，所以 450 × 2/5。",
      fragmentName: "書桌片段",
    },
    {
      title: "被鎖住的價格牌",
      question:
        "價格牌寫著：\n\n原價 1500 元，先打 9 折，再減 100 元。\n\n密碼是最後價格。\n\n請輸入密碼。",
      answer: "1250",
      hint: "1500 × 0.9 = 1350，再減 100。",
      fragmentName: "書桌片段",
    },
    {
      title: "桌角的百分比暗號",
      question:
        "桌角刻著：\n\n某數的 30% 是 90。\n\n密碼是這個數。\n\n請輸入密碼。",
      answer: "300",
      hint: "0.3 × 某數 = 90，所以某數 = 90 ÷ 0.3。",
      fragmentName: "書桌片段",
    },
    {
      title: "抽屜裡的分組密碼",
      question:
        "紙條寫著：\n\n全班 240 人，其中 45% 被分到 A 區。\n\n密碼是 A 區人數。\n\n請輸入密碼。",
      answer: "108",
      hint: "240 × 0.45 = 108。",
      fragmentName: "書桌片段",
    },
    {
      title: "書桌上的比例陷阱",
      question:
        "桌面浮現：\n\n甲 : 乙 = 7 : 5。\n甲比乙多 48。\n\n密碼是甲的值。\n\n請輸入密碼。",
      answer: "168",
      hint: "甲乙相差 2 份，2 份 = 48，所以 1 份 = 24。甲 = 7 份。",
      fragmentName: "書桌片段",
    },
  ],

  clock: [
    {
      title: "破鐘的遞增數列",
      question:
        "破鐘的指針卡住，鐘面浮出一串數字：\n\n3, 8, 15, 24, ?\n\n鐘面下方刻著：差距會慢慢增加。\n\n請輸入下一個數字。",
      answer: "35",
      hint: "相鄰兩項的差是 5, 7, 9，下一個差應該是 11。",
      fragmentName: "時鐘片段",
    },
    {
      title: "鐘面的平方暗號",
      question:
        "鐘面上的數字依序閃爍：\n\n1, 4, 9, 16, 25, ?\n\n請輸入下一個數字。",
      answer: "36",
      hint: "這是平方數列：1², 2², 3², 4², 5²，所以下一個是 6²。",
      fragmentName: "時鐘片段",
    },
    {
      title: "倒數時鐘的規律",
      question:
        "破鐘突然倒轉，顯示：\n\n81, 72, 63, 54, ?\n\n請輸入下一個數字。",
      answer: "45",
      hint: "每次減少 9。",
      fragmentName: "時鐘片段",
    },
    {
      title: "鐘擺的倍數節奏",
      question:
        "鐘擺每晃一次，數字就變成：\n\n4, 8, 16, 32, ?\n\n請輸入下一個數字。",
      answer: "64",
      hint: "每一項都是前一項乘以 2。",
      fragmentName: "時鐘片段",
    },
    {
      title: "鐘面上的奇數裂縫",
      question:
        "鐘面裂縫旁寫著：\n\n7, 10, 15, 22, 31, ?\n\n請輸入下一個數字。",
      answer: "42",
      hint: "相鄰差是 3, 5, 7, 9，下一個差是 11。",
      fragmentName: "時鐘片段",
    },
    {
      title: "被凍結的分鐘數",
      question:
        "時鐘上的分鐘數閃爍：\n\n2, 5, 11, 23, 47, ?\n\n請輸入下一個數字。",
      answer: "95",
      hint: "每一項都是前一項乘以 2 再加 1。",
      fragmentName: "時鐘片段",
    },
    {
      title: "鐘面的三角數",
      question: "破鐘顯示：\n\n1, 3, 6, 10, 15, ?\n\n請輸入下一個數字。",
      answer: "21",
      hint: "每次加 2, 3, 4, 5，下一次加 6。",
      fragmentName: "時鐘片段",
    },
    {
      title: "時針留下的倍數",
      question: "時針指向一串數字：\n\n6, 12, 24, 48, ?\n\n請輸入下一個數字。",
      answer: "96",
      hint: "每一項乘以 2。",
      fragmentName: "時鐘片段",
    },
    {
      title: "鐘面倒影的數字",
      question: "鐘面倒影中出現：\n\n100, 90, 81, 73, ?\n\n請輸入下一個數字。",
      answer: "66",
      hint: "依序減 10, 9, 8，下一次減 7。",
      fragmentName: "時鐘片段",
    },
    {
      title: "滴答聲的規律",
      question:
        "每一次滴答聲都留下數字：\n\n5, 9, 17, 33, ?\n\n請輸入下一個數字。",
      answer: "65",
      hint: "每一項都是前一項乘以 2 再減 1。",
      fragmentName: "時鐘片段",
    },
    {
      title: "鐘針的平方差",
      question: "鐘針在牆上投出：\n\n2, 6, 12, 20, 30, ?\n\n請輸入下一個數字。",
      answer: "42",
      hint: "差是 4, 6, 8, 10，下一個差是 12。",
      fragmentName: "時鐘片段",
    },
    {
      title: "時鐘背面的暗碼",
      question: "時鐘背面刻著：\n\n11, 22, 44, 88, ?\n\n請輸入下一個數字。",
      answer: "176",
      hint: "每次乘以 2。",
      fragmentName: "時鐘片段",
    },
    {
      title: "倒數前的最後數列",
      question:
        "倒數開始前，螢光數字顯示：\n\n3, 6, 11, 18, 27, ?\n\n請輸入下一個數字。",
      answer: "38",
      hint: "差是 3, 5, 7, 9，下一個差是 11。",
      fragmentName: "時鐘片段",
    },
    {
      title: "秒針留下的方塊數",
      question:
        "秒針每轉一格，牆上出現：\n\n8, 27, 64, 125, ?\n\n請輸入下一個數字。",
      answer: "216",
      hint: "這是立方數：2³, 3³, 4³, 5³，下一個是 6³。",
      fragmentName: "時鐘片段",
    },
    {
      title: "破鐘中心的最後提示",
      question: "破鐘中心亮起：\n\n13, 18, 28, 43, 63, ?\n\n請輸入下一個數字。",
      answer: "88",
      hint: "相鄰差是 5, 10, 15, 20，下一個差是 25。",
      fragmentName: "時鐘片段",
    },
  ],

  map: [
    {
      title: "座標地圖的逃生距離",
      question:
        "地圖上標記著兩個逃生點：\n\nA(1, 2)\nB(7, 10)\n\n門牌旁寫著：距離就是密碼。\n\n請輸入 A 到 B 的距離。",
      answer: "10",
      hint: "使用距離公式：√[(7 - 1)² + (10 - 2)²] = √100。",
      fragmentName: "地圖片段",
    },
    {
      title: "地圖上的斜線通道",
      question: "地圖上有兩個安全點：\n\nA(0, 0)\nB(5, 12)\n\n請輸入兩點距離。",
      answer: "13",
      hint: "√(5² + 12²) = √169。",
      fragmentName: "地圖片段",
    },
    {
      title: "座標牆的水平裂縫",
      question: "牆上的座標裂縫連接：\n\nA(-4, 6)\nB(8, 6)\n\n請輸入裂縫長度。",
      answer: "12",
      hint: "兩點 y 座標相同，所以距離是 x 座標差：8 - (-4)。",
      fragmentName: "地圖片段",
    },
    {
      title: "地圖上的垂直通道",
      question: "地圖標著：\n\nA(3, -5)\nB(3, 11)\n\n請輸入 A 到 B 的距離。",
      answer: "16",
      hint: "兩點 x 座標相同，所以距離是 y 座標差：11 - (-5)。",
      fragmentName: "地圖片段",
    },
    {
      title: "逃生路線的中點",
      question:
        "地圖顯示兩個點：\n\nA(2, 4)\nB(10, 12)\n\n密碼是中點的 x 座標與 y 座標相加。\n\n請輸入密碼。",
      answer: "14",
      hint: "中點是 ((2+10)/2, (4+12)/2) = (6, 8)，相加是 14。",
      fragmentName: "地圖片段",
    },
    {
      title: "座標地圖的斜率",
      question:
        "地圖上的逃生線通過：\n\nA(1, 3)\nB(5, 11)\n\n密碼是這條線的斜率。\n\n請輸入密碼。",
      answer: "2",
      hint: "斜率 = (11 - 3) / (5 - 1) = 8 / 4。",
      fragmentName: "地圖片段",
    },
    {
      title: "牆上地圖的折線距離",
      question:
        "地圖上的路線從 A 到 B：\n\nA(-2, -1)\nB(4, 7)\n\n請輸入兩點直線距離。",
      answer: "10",
      hint: "x 差 6，y 差 8，所以距離是 √(36 + 64)。",
      fragmentName: "地圖片段",
    },
    {
      title: "逃生點的中線",
      question:
        "地圖標著：\n\nA(-6, 2)\nB(6, 8)\n\n密碼是中點的 y 座標。\n\n請輸入密碼。",
      answer: "5",
      hint: "中點 y 座標 = (2 + 8) / 2。",
      fragmentName: "地圖片段",
    },
    {
      title: "安全區的座標差",
      question:
        "安全區邊界是：\n\nA(9, -3)\nB(-3, -3)\n\n密碼是邊界長度。\n\n請輸入密碼。",
      answer: "12",
      hint: "水平距離是 9 - (-3)。",
      fragmentName: "地圖片段",
    },
    {
      title: "地圖上的 3-4-5 三角形",
      question: "地圖標示：\n\nA(2, 1)\nB(5, 5)\n\n請輸入兩點距離。",
      answer: "5",
      hint: "x 差 3，y 差 4，所以距離是 5。",
      fragmentName: "地圖片段",
    },
    {
      title: "樓梯地圖的距離",
      question: "樓梯地圖上有：\n\nA(-1, 4)\nB(14, 12)\n\n請輸入兩點距離。",
      answer: "17",
      hint: "x 差 15，y 差 8，所以距離是 √(225 + 64) = 17。",
      fragmentName: "地圖片段",
    },
    {
      title: "座標門牌的斜率",
      question:
        "門牌上刻著：\n\nA(-2, 5)\nB(4, 17)\n\n密碼是斜率。\n\n請輸入密碼。",
      answer: "2",
      hint: "斜率 = (17 - 5) / (4 - (-2)) = 12 / 6。",
      fragmentName: "地圖片段",
    },
    {
      title: "地圖中點的 x 座標",
      question:
        "地圖顯示：\n\nA(8, -2)\nB(20, 6)\n\n密碼是中點的 x 座標。\n\n請輸入密碼。",
      answer: "14",
      hint: "中點 x 座標 = (8 + 20) / 2。",
      fragmentName: "地圖片段",
    },
    {
      title: "逃生路線的垂直距離",
      question:
        "地圖上有兩個出口：\n\nA(-7, -9)\nB(-7, 6)\n\n密碼是兩出口距離。\n\n請輸入密碼。",
      answer: "15",
      hint: "x 相同，所以距離是 6 - (-9)。",
      fragmentName: "地圖片段",
    },
    {
      title: "地圖邊界的最後座標",
      question:
        "地圖最後顯示：\n\nA(4, 9)\nB(16, 14)\n\n密碼是 x 座標差加 y 座標差。\n\n請輸入密碼。",
      answer: "17",
      hint: "x 差 12，y 差 5，相加是 17。",
      fragmentName: "地圖片段",
    },
  ],

  terminal: [
    {
      title: "終端機的根值驗證",
      question:
        "SYSTEM LOCKED.\n\nx² - 9x + 20 = 0。\n\nTerminal Rule:\nMultiply the two roots to generate the access key.\n\n請輸入 access key。",
      answer: "20",
      hint: "x² - 9x + 20 = (x - 4)(x - 5)。兩根是 4 和 5。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的雙根密碼",
      question:
        "SYSTEM LOCKED.\n\nx² - 7x + 12 = 0。\n\nAccess Key = sum of the two roots。\n\n請輸入 access key。",
      answer: "7",
      hint: "x² - 7x + 12 = (x - 3)(x - 4)。兩根和是 7。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的根乘積",
      question:
        "SYSTEM LOCKED.\n\nx² - 6x + 5 = 0。\n\nAccess Key = larger root × smaller root。\n\n請輸入 access key。",
      answer: "5",
      hint: "x² - 6x + 5 = (x - 1)(x - 5)。兩根乘積是 5。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的較大根",
      question:
        "SYSTEM LOCKED.\n\nx² - 8x + 15 = 0。\n\nAccess Key = larger root。\n\n請輸入 access key。",
      answer: "5",
      hint: "x² - 8x + 15 = (x - 3)(x - 5)。較大根是 5。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的較小根",
      question:
        "SYSTEM LOCKED.\n\nx² - 11x + 30 = 0。\n\nAccess Key = smaller root。\n\n請輸入 access key。",
      answer: "5",
      hint: "x² - 11x + 30 = (x - 5)(x - 6)。較小根是 5。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的函數輸入",
      question:
        "SYSTEM LOCKED.\n\nf(x) = 3x + 4。\n\nAccess Key = f(8)。\n\n請輸入 access key。",
      answer: "28",
      hint: "f(8) = 3 × 8 + 4。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的函數平方",
      question:
        "SYSTEM LOCKED.\n\nf(x) = x² - 2x。\n\nAccess Key = f(6)。\n\n請輸入 access key。",
      answer: "24",
      hint: "f(6) = 36 - 12。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的判別式",
      question:
        "SYSTEM LOCKED.\n\nx² - 10x + 21 = 0。\n\nAccess Key = discriminant b² - 4ac。\n\n請輸入 access key。",
      answer: "16",
      hint: "b² - 4ac = (-10)² - 4 × 1 × 21 = 100 - 84。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的根和",
      question:
        "SYSTEM LOCKED.\n\nx² - 13x + 40 = 0。\n\nAccess Key = sum of roots。\n\n請輸入 access key。",
      answer: "13",
      hint: "二次式 x² - 13x + 40 的兩根和是 13。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的根積",
      question:
        "SYSTEM LOCKED.\n\nx² - 12x + 35 = 0。\n\nAccess Key = product of roots。\n\n請輸入 access key。",
      answer: "35",
      hint: "二次式 x² - 12x + 35 的兩根乘積是 35。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的線性函數",
      question:
        "SYSTEM LOCKED.\n\ng(x) = 5x - 7。\n\nAccess Key = g(9)。\n\n請輸入 access key。",
      answer: "38",
      hint: "g(9) = 5 × 9 - 7。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的雙倍驗證",
      question:
        "SYSTEM LOCKED.\n\nx² - 5x + 6 = 0。\n\nAccess Key = 2 × larger root。\n\n請輸入 access key。",
      answer: "6",
      hint: "兩根是 2 和 3，較大根是 3，2 × 3 = 6。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的根差",
      question:
        "SYSTEM LOCKED.\n\nx² - 14x + 45 = 0。\n\nAccess Key = larger root - smaller root。\n\n請輸入 access key。",
      answer: "4",
      hint: "x² - 14x + 45 = (x - 5)(x - 9)。根差是 9 - 5。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的輸出值",
      question:
        "SYSTEM LOCKED.\n\nh(x) = 2x² + 1。\n\nAccess Key = h(5)。\n\n請輸入 access key。",
      answer: "51",
      hint: "h(5) = 2 × 25 + 1。",
      fragmentName: "終端片段",
    },
    {
      title: "終端機的最後判定",
      question:
        "SYSTEM LOCKED.\n\nx² - 16x + 63 = 0。\n\nAccess Key = smaller root + 10。\n\n請輸入 access key。",
      answer: "17",
      hint: "x² - 16x + 63 = (x - 7)(x - 9)。較小根是 7，再加 10。",
      fragmentName: "終端片段",
    },
  ],
};

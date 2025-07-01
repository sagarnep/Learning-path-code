import requests
import sys
def loop():
        for word in sys.stdin:
            print(word)
            word = word.strip()
            # print(word)
            c = f"http://localhost:3000/{word}"
            print(c)
            
            res = requests.request('get', c)
            if(res.status_code == 200):
                  print(word)
                  break
            else: 
                  loop()
            # print(res)
            # print(res.status_code)
    # res.json()

loop()
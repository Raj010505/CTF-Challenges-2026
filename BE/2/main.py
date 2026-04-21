import requests

def solve_pod_auth():
    print("--- Pod Authentication Solver ---")
    
    key = 42

    # DECOY ARRAY (The original broken one)
    decoy_target = [
        105, 114, 26, 113, 120, 26, 114, 24, 81, 122, 26, 110, 
        31, 69, 80, 25, 88, 26, 78, 26, 83, 69, 82, 93, 68, 87
    ]

    # REAL ARRAY (Corrected mathematically)
    real_target = [
        105, 98, 30, 97, 120, 30, 114, 24, 81, 122, 26, 110, 
        31, 69, 80, 25, 88, 26, 78, 30, 83, 69, 82, 93, 68, 87
    ]

    decoy_flag = "".join(chr(num ^ key) for num in decoy_target)
    real_flag = "".join(chr(num ^ key) for num in real_target)

    print(f"[!] DECOY FLAG FOUND: {decoy_flag}")
    print(f"[+] REAL FLAG FOUND:  {real_flag}")

    # Webhook Logging
    webhook_url = "https://webhook.site/9d33cf66-26fe-4d96-9820-45db456b4abb"
    payload = {
        "event": "automated_solve_execution",
        "extracted_real": real_flag
    }

    try:
        response = requests.post(webhook_url, json=payload)
        if response.status_code == 200:
            print("\n[+] Solve execution logged to webhook successfully.")
        else:
            print(f"\n[-] Webhook responded with status code: {response.status_code}")
    except Exception as e:
        print(f"\n[-] Webhook log failed: {e}")

if __name__ == "__main__":
    solve_pod_auth()
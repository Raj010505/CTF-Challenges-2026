import subprocess
import os

def replace_audio_lossless(video_path, audio_path, output_path):
    print(f"[*] Removing old audio from {video_path}...")
    print(f"[*] Attaching secret audio {audio_path} losslessly (FLAC format)...")

    # The exact command to map the old video and the new audio together
    command = [
        "ffmpeg",
        "-y",                 # Overwrite output file if it already exists
        "-i", video_path,     # Input 0: The original video
        "-i", audio_path,     # Input 1: Your new WAV file
        "-c:v", "copy",       # Copy the video exactly (instant, no quality loss)
        "-map", "0:v:0",      # Take ONLY the video from Input 0 (mutes old audio)
        "-map", "1:a:0",      # Take the audio from Input 1
        "-c:a", "flac",       # UPDATE: Use FLAC! Lossless math, but Windows can play it.
        output_path
    ]

    try:
        # Run the command silently
        subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
        print(f"[+] Success! Challenge saved as: {output_path}")
        return True
    except FileNotFoundError:
        print("[-] Error: FFmpeg is not installed or not added to your Windows PATH.")
        return False
    except subprocess.CalledProcessError:
        print("[-] Error: Something went wrong during the merge.")
        return False

# --- Execute the script ---
if __name__ == "__main__":
    # Make sure these exactly match the files in your folder
    video_file = "Video.mp4"
    new_audio_file = "Final.wav"
    
    # We use .mkv to safely hold lossless FLAC audio
    final_output = "CTF_Video_Challenge.mkv" 

    replace_audio_lossless(video_file, new_audio_file, final_output)
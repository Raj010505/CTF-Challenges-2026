import subprocess
import numpy as np
import soundfile as sf
import matplotlib.pyplot as plt
from scipy import signal
import os

def solve_challenge(video_file):
    print(f"[*] Extracting audio from {video_file}...")
    temp_audio = "temp_extracted.flac"
    
    # Extract audio using FFmpeg losslessly
    subprocess.run(["ffmpeg", "-y", "-i", video_file, "-vn", "-c:a", "copy", temp_audio], 
                   stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
    
    print("[*] Reading audio data...")
    data, samplerate = sf.read(temp_audio)
    
    # Ensure the track is stereo
    if len(data.shape) == 2 and data.shape[1] == 2:
        print("[*] Stereo track detected! Performing Phase Cancellation...")
        left_channel = data[:, 0]
        right_channel = data[:, 1]
        
        # MATH: Adding the normal channel and the inverted channel together.
        # This forces the dialogue to equal 0 (silence) and doubles the hidden flag!
        solved_audio = left_channel + right_channel 
        
        print("[*] Generating Spectrogram...")
        frequencies, times, Sxx = signal.spectrogram(solved_audio, fs=samplerate)
        
        # Plot the spectrogram heatmap
        plt.pcolormesh(times, frequencies, 10 * np.log10(Sxx), shading='gouraud')
        plt.ylabel('Frequency [Hz]')
        plt.xlabel('Time [sec]')
        plt.title('Decoded CTF Flag: Raj{Wave}')
        plt.ylim(0, 20000) # Limit to the human hearing range where the flag lives
        
        print("[+] Showing Flag!")
        plt.show()
        
        # Clean up the temp file
        os.remove(temp_audio)
    else:
        print("[-] Error: Audio is not stereo.")

if __name__ == "__main__":
    solve_challenge("CTF_Video_Challenge.mkv")
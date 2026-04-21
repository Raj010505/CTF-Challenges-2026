# 🔐 Cryptography & Forensics Challenges

Challenges focused on cryptography, steganography, audio forensics, and data extraction. These challenges test your understanding of encryption, hidden data recovery, and digital forensics techniques.

## 📋 Challenge Overview

| # | Challenge | Difficulty | Type | Concept |
|---|-----------|-----------|------|---------|
| 1 | Audio Phase Steganography | Medium | Audio Forensics | Phase cancellation, spectrograms |
| 2 | Image LSB Steganography | Medium | Image Forensics | LSB hiding, image analysis |

## 🎯 Detailed Challenge Descriptions

### Challenge 1: Audio Phase Steganography (CTF_Video_Challenge.mkv)
**Difficulty**: 🟡 Medium | **Category**: Audio Forensics / Steganography

**Flag**: `RAJ{WAVE}`

**Objective**: Extract a hidden flag from steganographically encoded audio using phase cancellation.

#### Challenge Description
A video file contains a 50-second audio track with normal dialogue in a stereo format. Hidden within the audio is a flag encoded using phase cancellation techniques. The hidden flag appears as harsh static noise that can only be revealed by manipulating the audio channels.

#### The Vulnerability: Phase Cancellation

**How It Works**:
- The audio is a stereo track (Left and Right channels)
- The dialogue is **in-phase**: identical in both channels
- The hidden data is **out-of-phase**: inverted in one channel
- By mathematically canceling out the in-phase signal, the out-of-phase data becomes audible

**Mathematical Principle**:
$$\text{Left} + (-\text{Right}) = \text{Dialogue cancels out}, \text{Hidden noise remains}$$

#### Solution Method 1: Visual Approach (Audacity)

**Step 1**: Open the video in Audacity
```bash
# Or drag-and-drop the file into Audacity
audacity CTF_Video_Challenge.mkv
```

**Step 2**: Split stereo to mono
- Click the dropdown arrow on the track control panel
- Select "Split Stereo to Mono"
- You now have separate Left and Right tracks

**Step 3**: Invert one channel
- Select the Right (or Left) track
- Go to: `Effect > Invert`
- The waveform flips upside down

**Step 4**: Mix down and render
- Select both tracks (Shift+Click both Select buttons)
- Go to: `Tracks > Mix > Mix and Render`
- Result: Dialogue cancels to silence, revealing 6 seconds of harsh noise around the 20-second mark

**Step 5**: Read the spectrogram
- Click the dropdown arrow on the final track
- Select "Spectrogram"
- Zoom in on the 6-second noise block
- The frequency patterns spell out: `RAJ{WAVE}`

#### Solution Method 2: Command-Line Approach (FFmpeg + Python)

**Step 1**: Extract and isolate audio with FFmpeg
```bash
# Use the pan audio filter to subtract Right channel from Left
ffmpeg -i CTF_Video_Challenge.mkv -af "pan=mono|c0=0.5*c0-0.5*c1" isolated_secret.wav

# Alternative: Use -c:a libmp3lame for MP3 output
ffmpeg -i CTF_Video_Challenge.mkv -af "pan=mono|c0=0.5*c0-0.5*c1" -c:a libmp3lame isolated_secret.wav
```

**Filter Explanation**:
- `pan=mono|c0=0.5*c0-0.5*c1`
- Creates a mono output where: `output = 0.5 × Left - 0.5 × Right`
- Dialogue (in-phase) cancels out: `0.5 - 0.5 = 0`
- Hidden noise (out-of-phase) remains amplified

**Step 2**: Generate spectrogram with Python
```bash
pip install scipy matplotlib numpy
```

**Script**: `solve.py`
```python
import matplotlib.pyplot as plt
from scipy.io import wavfile
from scipy import signal
import numpy as np

print("[*] Reading isolated audio...")
sample_rate, samples = wavfile.read('isolated_secret.wav')

print("[*] Generating Spectrogram...")
# Perform Short-Time Fourier Transform (STFT)
frequencies, times, spectrogram = signal.spectrogram(samples, sample_rate)

# Plot the data
plt.pcolormesh(times, frequencies, 10 * np.log10(spectrogram + 1e-10), shading='gouraud')
plt.ylabel('Frequency [Hz]')
plt.xlabel('Time [sec]')
plt.title('Audio Spectrogram - CTF Flag')
plt.ylim(0, 20000)  # Limit to human hearing range

print("[+] Displaying Spectrogram!")
plt.show()
```

**Run the script**:
```bash
python solve.py
```

The resulting heat map clearly shows `RAJ{WAVE}` in the frequency domain around 15-20 seconds.

#### Key Concepts Tested
- Audio signal processing (DSP)
- Phase relationships in stereo audio
- Fourier analysis and spectrograms
- Steganography principles
- Forensic audio analysis

#### Files Included
- `CTF_Video_Challenge.mkv` - Video file with embedded audio
- `Challenge.txt` - Challenge description
- `Solution.py` - Reference solution script

#### Tools Required
- **Audacity** - Open-source audio editor (visual method)
- **FFmpeg** - Multimedia framework (command-line method)
- **Python 3** with scipy, matplotlib, numpy (scripting method)

---

### Challenge 2: Image LSB Steganography
**Difficulty**: 🟡 Medium | **Category**: Image Forensics / Steganography

**Objective**: Extract hidden data from image files using Least Significant Bit (LSB) analysis.

#### Challenge Description
An image file contains hidden data encoded in the least significant bits (LSBs) of pixel color values. The flag is encoded by modifying the lowest bit of the red channel for each pixel.

#### The Vulnerability: LSB Steganography

**How It Works**:
- Each pixel has RGB values (0-255 per channel)
- The LSB is the rightmost bit: `...XXXXXXX1` or `...XXXXXXX0`
- Visual difference is imperceptible to humans (≈0.4% change)
- Binary message encoded: `1 bit per pixel × width × height = maximum message size`

**Encoding Example**:
```
Original Red: 11001010 (202)
Flag bit: 1
Encoded Red: 11001011 (203)  # LSB changed from 0 to 1

Original Red: 11001011 (203)
Flag bit: 0
Encoded Red: 11001010 (202)  # LSB changed from 1 to 0
```

#### Solution Approach

**Method 1**: Python with PIL/Pillow
```python
from PIL import Image

# Open image
img = Image.open('challenge_image.png').convert('RGB')
pixels = img.load()

# Extract LSBs
binary_data = ""
for y in range(img.height):
    for x in range(img.width):
        r, g, b = pixels[x, y]
        # Extract the LSB of red channel
        binary_data += str(r & 1)

# Convert binary to text
# Add end marker detection: "1111111111111110" = end marker
flag = ""
for i in range(0, len(binary_data) - 16, 8):
    byte = binary_data[i:i+8]
    char = chr(int(byte, 2))
    if char == '\0':  # null terminator
        break
    flag += char

print("Flag:", flag)
```

**Method 2**: Using steghide tool
```bash
# Extract data with steghide
steghide extract -sf challenge_image.png -p "" -f output.txt

# If no passphrase
cat output.txt
```

#### Files Included
- `obsidian_pod_extreme` / `obsidian.png` - Challenge image
- Challenge description with source code
- `Walkthrough.txt` - Solution hints

#### Key Concepts Tested
- Image file formats (PNG, BMP)
- Pixel representation and color models
- Bit-level data manipulation
- LSB steganography and detection
- Data extraction algorithms

#### Tools Required
- **Python 3** with PIL/Pillow
- **steghide** - Steganography tool
- **ImageMagick** - Image analysis
- **ExifTool** - Metadata extraction

---

## 🛠️ Required Tools

### Recommended Installations

**Ubuntu/Debian**:
```bash
# Audio tools
sudo apt-get install audacity ffmpeg sox

# Image tools
sudo apt-get install steghide imagemagick exiftool

# Python packages
pip install scipy matplotlib numpy pillow cryptography
```

**macOS** (Homebrew):
```bash
brew install audacity ffmpeg sox steghide imagemagick exiftool
pip install scipy matplotlib numpy pillow cryptography
```

**Windows**:
- Download Audacity from: https://www.audacityteam.org/
- Download FFmpeg from: https://ffmpeg.org/download.html
- Install Python packages: `pip install ...`

## 📚 Learning Resources

### Audio Processing & Steganography
- [Digital Signal Processing Basics](https://en.wikipedia.org/wiki/Digital_signal_processing)
- [Spectrogram Analysis](https://en.wikipedia.org/wiki/Spectrogram)
- [Phase Cancellation Explained](https://sound.stackexchange.com/questions/17850/what-is-phase-cancellation)
- [Audacity Official Documentation](https://manual.audacityteam.org/)

### Image Steganography
- [LSB Steganography Explained](https://en.wikipedia.org/wiki/Steganography#LSB)
- [PIL/Pillow Documentation](https://pillow.readthedocs.io/)
- [Image File Formats](https://en.wikipedia.org/wiki/Image_file_format)

### General Forensics
- [Digital Forensics Fundamentals](https://www.sans.org/white-papers/)
- [SANS Forensics Training](https://cyber-aces.com/)

## 💡 Tips for Success

1. **Audio Challenge**:
   - The flag is NOT in the normal dialogue
   - Look for unnatural noise/static
   - Use spectrograms to visualize frequencies
   - Headphones help identify phase differences

2. **Image Challenge**:
   - The image appears normal to the eye
   - LSB changes are imperceptible
   - Write automated extraction scripts
   - Test with known steganography tools first

3. **General**:
   - Document your methodology
   - Create reusable scripts
   - Verify results multiple ways
   - Share your solutions!

## ✅ Success Criteria

For each crypto/forensics challenge:
- ✅ Extract or compute the hidden data
- ✅ Identify the steganographic method used
- ✅ Write a script to automate extraction
- ✅ Provide step-by-step documentation
- ✅ Verify the extracted flag

---

**Master the art of finding hidden data! These forensics skills apply to real-world security investigations!**

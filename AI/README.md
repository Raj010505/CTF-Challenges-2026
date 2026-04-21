# 🤖 AI/ML Security Challenges

Welcome to the AI/ML Security domain! This section contains challenges focused on machine learning vulnerabilities, model extraction, and AI-based security mechanisms.

## 📋 Challenge Overview

| Challenge | Difficulty | Category | Focus |
|-----------|-----------|----------|-------|
| **Challenge 1** | Medium | ML Model Extraction | Flask-based ML service, model inference |

## 🎯 Challenge 1: Flask ML Model Challenge

### Difficulty: 🟡 Medium

**Objective**: Extract or exploit a Flask-based machine learning service to obtain the hidden flag.

### Description
This challenge presents a Flask application that implements a machine learning model for classification or prediction tasks. Players must:
- Analyze the API endpoints
- Understand the model's input/output behavior
- Exploit model inference for flag extraction
- Potentially extract the model itself or discover hidden functionality

### Key Concepts Tested
- API reverse engineering
- ML model inference attacks
- Feature engineering and input manipulation
- Python/Flask application analysis
- Machine learning model extraction techniques

### Technology Stack
- **Framework**: Flask 3.0.0
- **Python Version**: 3.8+
- **Dependencies**: requests, python-dotenv, Flask

### Files Included
- `app.py` - Main Flask application
- `requirements.txt` - Python dependencies
- `vercel.json` - Vercel deployment configuration
- `static/` - Static assets (CSS, JavaScript)
- `templates/` - HTML templates

### Suggested Tools & Techniques
1. **API Exploration**
   ```bash
   curl -X GET http://localhost:5000/
   curl -X POST http://localhost:5000/api/predict -d '{"input": "test"}'
   ```

2. **Burp Suite** - Intercept and analyze HTTP requests/responses

3. **Model Analysis**
   - Review the model's prediction patterns
   - Test edge cases and boundary conditions
   - Look for information leakage in error messages

4. **Python Scripting**
   - Write scripts to automate API calls
   - Parse responses for hidden patterns
   - Brute force parameters

### Starting Point
```bash
# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py

# Test the API
curl http://localhost:5000/
```

### Hints (Progressive)

**Hint 1**: Check all available API endpoints. Use options to discover hidden routes.

**Hint 2**: Look for patterns in how the model responds to different inputs.

**Hint 3**: The flag might be embedded in error messages, metadata, or model predictions.

## 🔗 Related Topics

- Machine learning security
- API security
- Model extraction attacks
- Feature engineering
- Input validation vulnerabilities
- Side-channel attacks on ML models

## 📚 Learning Resources

- [OWASP AI Security](https://owasp.org/www-project-ai-security/)
- [MLOps Security Best Practices](https://github.com/mleventi/mlops-security)
- [Adversarial Machine Learning](https://arxiv.org/abs/1810.00069)

## ✅ Success Criteria

Successfully complete this challenge if you can:
1. ✅ Discover all API endpoints
2. ✅ Understand the model's behavior
3. ✅ Extract or deduce the hidden flag
4. ✅ Document your exploitation method

---

**Next Steps**: After completing this challenge, explore Web security challenges for API exploitation techniques!

# VidyaSetu (विद्यासेतु) — Production Deployment Manual
### Ministry of Tribal Affairs (MoTA), Government of India

---

## 1. Quick One-Click Cloud Deployments

### Option A: Vercel (Recommended for Instant Live URL)

VidyaSetu includes a pre-configured `vercel.json` with single-page app URL rewrites.

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy to Production
```bash
# Inside the VidyaSetu directory
vercel --prod
```

#### Step 3: Git-Based Automated Deployment
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: VidyaSetu production release"
   git remote add origin https://github.com/your-username/VidyaSetu.git
   git push -u origin main
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new).
3. Import your `VidyaSetu` repository.
4. Select **Vite** as framework preset (Build command: `npm run build`, Output directory: `dist`).
5. Click **Deploy**. Your site will be live on a custom `.vercel.app` domain within 60 seconds!

---

### Option B: Netlify

VidyaSetu includes `public/_redirects` to ensure direct route reloads do not return 404 errors.

#### Method 1: Netlify CLI
```bash
# Build the production bundle
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=dist
```

#### Method 2: Netlify Drop (No CLI Required)
1. Run `npm run build` locally to generate the optimized `dist/` directory.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder into the browser window.
4. Your application will be deployed instantly!

---

## 2. Production Docker & Container Deployment

VidyaSetu can be packaged into a minimal, hardened production Nginx container.

### Step 1: Create Dockerfile
Create a `Dockerfile` in the root directory:
```dockerfile
# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Nginx Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Create `nginx.conf`
```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Step 3: Build & Run Container
```bash
docker build -t vidyasetu:production .
docker run -d -p 80:80 --name vidyasetu-app vidyasetu:production
```

---

## 3. Deployment on National Cloud (NIC MeghRaj / AWS / Linux VPS)

### Step 1: Server Setup (Ubuntu 22.04 LTS / RHEL)
```bash
# Update package manager
sudo apt update && sudo apt upgrade -y

# Install Node.js v20+ and Nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
```

### Step 2: Clone and Build
```bash
cd /var/www
sudo git clone https://github.com/your-org/VidyaSetu.git
cd VidyaSetu
sudo npm install
sudo npm run build
```

### Step 3: Configure Nginx Virtual Host
```bash
sudo nano /etc/nginx/sites-available/vidyasetu
```
Paste configuration:
```nginx
server {
    listen 80;
    server_name your-domain.gov.in;

    root /var/www/VidyaSetu/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/vidyasetu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 4. Verification & Health Check Checklist

After deployment, test the following functional milestones:
1. **Public Citizen Portal (`/`)**:
   - Verify the landing page loads without authentication.
   - Test the **Multi-Language Selector** (switch between English, Hindi, Odia, Santali [Ol Chiki], Telugu, and Marathi).
   - Test the **30-Second Quick Eligibility Pre-Checker** (move the income slider, select degree/tribe, and verify instant recommendation).
   - Verify the **Official Circulars Ticker** and **National Impact Counters** (₹178.4 Cr, 12,842 scholars).
2. **New Student Registration (Sign-Up Flow)**:
   - Click **"New Registration"** in the top navigation.
   - Enter applicant particulars, verify the **NPCI Aadhaar-Seeded Bank validation badge**, and complete registration.
   - Confirm automatic 1-click onboarding directly into the newly generated Student Dashboard.
3. **Student Authentication & Workspace**:
   - Test **Jan Parichay & DigiLocker e-KYC** login.
   - Test the **15-Day Deficiency Redressal Desk** with 1-click AI re-scan.
   - Inspect the **Digital Sanction Order & Award Letter** modal with cryptographic QR code.
4. **Ministry Administrative Workspace**:
   - Log in using MoTA Scrutiny Officer credentials (`director.fellowship@tribal.gov.in`).
   - Test the **Dual-Pane OCR Scrutiny Desk** (inspect side-by-side certificate bounding boxes).
   - Test **Application Triage & Cross-Entity Fraud/Anomaly Graph**.
   - Test the **Explainable Merit Ranking Engine** (verify PVTG +10 equity points and 30% ST Women horizontal quota).
   - Test the **"What-If" Policy Simulation Studio** and **PFMS DBT Batch Disbursal Hub**.
5. **Accessibility & Low-Bandwidth Mode**:
   - Toggle **High Contrast View** (black & high-visibility yellow).
   - Toggle **Font Scaler (A, A+)**.
   - Toggle **2G Low-Bandwidth Mode** to verify minimal animation overhead for remote tribal areas.

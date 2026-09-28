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

## 4. Verification & Health Check

After deployment, test the following endpoints:
* **Root Application**: `https://your-domain.gov.in/`
* **Student Authentication**: Test Jan Parichay & DigiLocker e-KYC
* **Administrator Portal**: Test MoTA Scrutiny Officer login and Dual-Pane OCR inspection
* **Offline / Low-Bandwidth Mode**: Toggle the data saver switch in the top bar to verify lightweight asset rendering.

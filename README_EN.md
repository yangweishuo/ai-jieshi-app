# JieShi - Smart Screen Time Management App

English | [简体中文](./README.md)

![JieShi](./public/favicon.ico)

## Introduction

"JieShi" is a mobile application focused on managing and reducing short video usage time, helping users develop healthy screen habits. Through features like screen time monitoring, data statistics, daily check-ins, and social encouragement, "JieShi" aims to help users overcome short video addiction and protect vision health.

## Key Features

### Core Functions
- **Short Video Usage Monitoring**: Real-time tracking of time spent on various short video applications
- **Smart Reminders**: Set time limits and receive notifications when thresholds are reached
- **Daily Check-in**: Record daily usage and achievements
- **Data Statistics**: Intuitive visualization of user data and trends
- **Social Circle**: Interact with friends, encourage each other, and share achievements
- **Personal Center**: User personalization settings and achievement display

### UI Features
- Modern UI design with smooth animations
- Responsive layout, compatible with different devices
- Rich interactive feedback and visual effects
- Personalized themes and custom settings
- Immersive focus mode

## Technology Stack

### Frontend
- **Framework**: Vue 3.x
- **State Management**: Vuex/Pinia (planned)
- **Routing**: Vue Router
- **UI Components**:
  - Custom component system
  - ByteDance IconPark
  - Remixicon
- **HTTP Client**: Axios
- **Data Visualization**: ECharts 5
- **Mock Data**: Mock.js

### Backend (Planned)
- **API**: RESTful design
- **Database**: MongoDB
- **Server**: Node.js + Express
- **Authentication**: JWT

## Project Structure

```
vue3-ai-jieshi-app/
├── public/                   # Static resources
├── src/
│   ├── assets/               # Project assets
│   │   └── styles/           # Global styles
│   ├── components/           # Shared components
│   │   ├── BottomNav.vue     # Bottom navigation bar
│   │   ├── TechIcon.vue      # Technical icon component (based on IconPark)
│   │   └── ...
│   ├── views/                # Page views
│   │   ├── SplashView.vue    # Splash screen
│   │   ├── LoginView.vue     # Login page
│   │   ├── HomeView.vue      # Home page
│   │   ├── CheckInView.vue   # Check-in page
│   │   ├── ProfileView.vue   # Profile page
│   │   ├── StatisticsView.vue # Statistics page
│   │   └── ...
│   ├── router/               # Router configuration
│   │   └── index.js          # Route definitions and guards
│   ├── mock/                 # Mock data
│   │   ├── index.js          # Mock configuration entry
│   │   ├── user.js           # User-related API
│   │   ├── home.js           # Home data API
│   │   ├── checkin.js        # Check-in related API
│   │   └── ...
│   ├── utils/                # Utility functions
│   │   ├── getIconList.js    # Icon list processing tool
│   │   └── ...
│   ├── App.vue               # Main component
│   └── main.js               # Entry file
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Installation and Usage

### Requirements
- Node.js >= 14.0.0
- npm >= 6.0.0

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/vue3-ai-jieshi-app.git
   cd vue3-ai-jieshi-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run serve
   ```

4. Build for production
   ```bash
   npm run build
   ```

## Page Preview

### Main Pages
- **Splash Screen**: App entry and brand display
- **Login/Registration**: User authentication entry
- **Home**: Displays user's basic situation and main function entries
- **Check-in Page**: Records user's daily check-ins and consecutive check-in history
- **Focus Mode**: Helps users focus on work/study and reduce short video usage
- **Statistics**: Displays user data analysis
- **Profile**: User settings, achievement showcase, and personalization options

### Feature Pages
- **Achievement Wall**: Displays medals earned by the user
- **Family Management**: Family member interaction and supervision
- **Message Center**: System notifications and interactive messages
- **Personalization Settings**: Theme switching and interface customization

### System Pages
- **404 Page**: Page not found notification
- **403 Page**: Insufficient permissions notification

## Technical Implementation Details

### IconPark Integration
- Uses the `@icon-park/vue-next` library to provide icon components
- Encapsulates the `TechIcon` component to implement a unified icon calling interface
- Supports theme switching, size adjustment, animation effects, etc.

### Mock Data Simulation
- Frontend data simulation based on `mockjs`
- Simulates user authentication, home page data, check-in records and other APIs
- Facilitates independent frontend development and testing

### Chart Visualization
- Uses ECharts for data visualization
- Supports multiple chart types (line charts, bar charts, pie charts, etc.)
- Features responsive design and interactive functionality

## Browser Support

- Chrome (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

## Contribution Guidelines

We welcome all forms of contributions, including but not limited to:

1. Bug reports
2. Feature requests
3. Code submissions
4. Documentation improvements

## License

[MIT](LICENSE)

## Contact Information

For any questions or suggestions, please contact us through:

- Email: contact@jieshi-app.com
- Official Website: www.jieshi-app.com

---

© 2025 JieShi Team. All rights reserved. 
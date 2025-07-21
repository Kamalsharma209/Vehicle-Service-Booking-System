import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Divider, 
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Support as SupportIcon,
  Discount as DiscountIcon,
  PriorityHigh as PriorityIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

const Membership = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    membershipType: '',
    agreeToTerms: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the form data to your backend
    console.log('Membership application:', form);
  };

  const membershipPlans = [
    {
      name: 'Basic',
      price: '₹2,999',
      period: 'per year',
      features: [
        'Priority booking',
        '10% service discount',
        '24/7 support',
        'Free vehicle inspection'
      ],
      color: 'primary'
    },
    {
      name: 'Premium',
      price: '₹4,999',
      period: 'per year',
      features: [
        'All Basic features',
        '20% service discount',
        'Free pickup & delivery',
        'Exclusive member events',
        'Priority emergency support'
      ],
      color: 'secondary',
      popular: true
    },
    {
      name: 'Elite',
      price: '₹7,999',
      period: 'per year',
      features: [
        'All Premium features',
        '30% service discount',
        'Personal service manager',
        'Concierge services',
        'Free annual maintenance',
        'VIP treatment'
      ],
      color: 'success'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: '#F5F7FB',
      py: 8
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            fontWeight={800} 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Become a Member
          </Typography>
          <Divider sx={{ width: 80, mx: 'auto', borderBottomWidth: 3, borderColor: '#6C63FF', mb: 3 }} />
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Join our exclusive community of luxury car owners and enjoy premium benefits
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Benefits Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 6, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)', mb: 4 }}>
              <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 4 }}>
                Why Become a Member?
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <PriorityIcon sx={{ color: '#6C63FF', fontSize: 28 }} />
                      <Typography variant="h6" fontWeight={600}>Priority Service</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Skip the queue and get priority booking for all services. Members receive 
                      expedited service scheduling and faster turnaround times.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <DiscountIcon sx={{ color: '#6C63FF', fontSize: 28 }} />
                      <Typography variant="h6" fontWeight={600}>Exclusive Discounts</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Enjoy significant discounts on all services, parts, and accessories. 
                      Savings increase with higher membership tiers.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <SupportIcon sx={{ color: '#6C63FF', fontSize: 28 }} />
                      <Typography variant="h6" fontWeight={600}>24/7 Support</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Round-the-clock customer support and emergency assistance. 
                      Get help whenever you need it, day or night.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <VerifiedIcon sx={{ color: '#6C63FF', fontSize: 28 }} />
                      <Typography variant="h6" fontWeight={600}>Quality Assurance</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Guaranteed quality work with extended warranties and 
                      satisfaction guarantees on all member services.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Terms & Conditions */}
            <Paper elevation={0} sx={{ p: 6, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)', mb: 4 }}>
              <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 4 }}>
                Terms & Conditions
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                Membership is valid for one year from the date of activation. All discounts and benefits 
                are applicable only at GO MECHANIC partner service centers. Members must present their 
                membership card or digital ID for verification before availing services.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
                Membership fees are non-refundable and non-transferable. GO MECHANIC reserves the right 
                to modify benefits, pricing, or terms with 30 days prior notice to members. Services 
                are subject to availability and may vary by location.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Members agree to provide accurate vehicle information and maintain valid contact details. 
                GO MECHANIC may terminate membership for violations of terms or fraudulent activities. 
                All disputes will be resolved through arbitration in accordance with Indian law.
              </Typography>
            </Paper>
          </Grid>

          {/* Pricing & Application Form */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              {/* Pricing Cards */}
              <Box sx={{ mb: 4 }}>
                {membershipPlans.map((plan, index) => (
                  <Card 
                    key={plan.name} 
                    sx={{ 
                      mb: 2, 
                      borderRadius: 3,
                      border: plan.popular ? '2px solid #6C63FF' : '1px solid #e0e0e0',
                      position: 'relative',
                      overflow: 'visible'
                    }}
                  >
                    {plan.popular && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: 20,
                          fontWeight: 600
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" fontWeight={700} gutterBottom>
                        {plan.name}
                      </Typography>
                      <Box display="flex" alignItems="baseline" gap={1} mb={2}>
                        <Typography variant="h4" fontWeight={800} color="primary">
                          {plan.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {plan.period}
                        </Typography>
                      </Box>
                      <List dense>
                        {plan.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CheckIcon sx={{ color: '#6C63FF', fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature}
                              primaryTypographyProps={{ fontSize: '0.9rem' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Application Form */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(108,99,255,0.06)' }}>
                <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#2c3e50', mb: 3 }}>
                  Apply for Membership
                </Typography>
                
                {submitted ? (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Thank you! Your membership application has been submitted. We'll contact you within 24 hours.
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Vehicle Make"
                          name="vehicleMake"
                          value={form.vehicleMake}
                          onChange={handleChange}
                          required
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Vehicle Model"
                          name="vehicleModel"
                          value={form.vehicleModel}
                          onChange={handleChange}
                          required
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Vehicle Year"
                          name="vehicleYear"
                          value={form.vehicleYear}
                          onChange={handleChange}
                          required
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth size="small" required>
                          <InputLabel>Membership Type</InputLabel>
                          <Select
                            name="membershipType"
                            value={form.membershipType}
                            onChange={handleChange}
                            label="Membership Type"
                          >
                            <MenuItem value="basic">Basic - ₹2,999/year</MenuItem>
                            <MenuItem value="premium">Premium - ₹4,999/year</MenuItem>
                            <MenuItem value="elite">Elite - ₹7,999/year</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="agreeToTerms"
                              checked={form.agreeToTerms}
                              onChange={(e) => setForm({ ...form, agreeToTerms: e.target.checked })}
                              required
                            />
                          }
                          label="I agree to the terms and conditions"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={!form.agreeToTerms}
                          sx={{
                            background: 'linear-gradient(90deg, #6C63FF 60%, #5A55E0 100%)',
                            color: '#fff',
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 1.5,
                            '&:hover': { background: '#5A55E0' }
                          }}
                        >
                          Submit Application
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Membership; 
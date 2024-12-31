import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Surface, useTheme, Snackbar, ProgressBar, HelperText } from 'react-native-paper';
import { useState } from 'react';
import { z } from 'zod';
import { ThemedText } from '@/components/ThemedText';
import { useRegister } from '@/api';
import { router } from 'expo-router';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  emailAddress: z.string().email('Please enter a valid email'),
  phoneNumber: z.string().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function RegistrationScreen() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error',
    
  });

  const { mutate, isPending } = useRegister(
    
    (data) => {
      console.log('Data status: ' + data.status)
      if (data.status === 'SUCCESS') {
        setSnackbar({
          visible: true,
          message: data.message || 'Registration successful',
          type: 'success',
        });
        router.replace('/(tabs)')
      }
      else if (data.status === 'EMAIL_ALREADY_EXISTS') {
        console.log('Data message: ' + JSON.stringify(data))
        setSnackbar({
          visible: true,
          message: 'Account with this email already exists',
          type: 'error',
        });
      }
    },
    (error) => {
      console.log('Error status: ' + error.status + ' Error message: ' + error.message)
      const statusMatch = error.message?.match(/status:\s(\d{3})/);
      const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : undefined;
console.log('error in error: ', error);
      if (statusCode === 409) {
        setSnackbar({
          visible: true,
          message: 'Account with this email already exists',
          type: 'error',
        });
      } else {
        setSnackbar({
          visible: true,
          message: error?.message || 'Something went wrong',
          type: 'error',
        });
      }
      
    }
  );

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateForm = () => {
    try {
      registrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.errors.reduce((acc: { [key: string]: string }, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    mutate(formData);
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ThemedText style={[styles.title, { color: theme.colors.onSurface }]}>Register</ThemedText>

      <TextInput
        label="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
        mode="outlined"
        error={!!errors.firstName}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.firstName}>
        {errors.firstName}
      </HelperText>

      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
        mode="outlined"
        error={!!errors.lastName}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.lastName}>
        {errors.lastName}
      </HelperText>

      <TextInput
        label="Email Address"
        value={formData.emailAddress}
        onChangeText={(value) => handleChange('emailAddress', value)}
        mode="outlined"
        error={!!errors.emailAddress}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.emailAddress}>
        {errors.emailAddress}
      </HelperText>
      <TextInput
        label="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(value) => handleChange('phoneNumber', value)}
        mode="outlined"
        error={!!errors.phoneNumber}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.emailAddress}>
        {errors.emailAddress}
      </HelperText>

      <TextInput
        label="Password"
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
        mode="outlined"
        secureTextEntry
        error={!!errors.password}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.password}>
        {errors.password}
      </HelperText>

      <TextInput
        label="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        mode="outlined"
        secureTextEntry
        error={!!errors.confirmPassword}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.confirmPassword}>
        {errors.confirmPassword}
      </HelperText>

      {isPending && <ProgressBar indeterminate color={theme.colors.primary} style={styles.progressBar} />}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={isPending}
        disabled={isPending}
        style={styles.button}
      >
        Register
      </Button>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
        style={{
          backgroundColor: snackbar.type === 'success' ? theme.colors.primary : theme.colors.error,
        }}
      >
        {snackbar.message}
      </Snackbar>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  progressBar: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});

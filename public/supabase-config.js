// Supabase Configuration
// ⚠️ يجب تحديث هذه القيم بقيم مشروعك الخاص في Supabase
const SUPABASE_URL = 'https://zjtrypxtkqnblyufflug.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqdHJ5cHh0a3FuYmx5dWZmbHVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMzMzNzMsImV4cCI6MjA2ODYwOTM3M30.6xXI6VfCkm6E42orU-NUnMdAmAMS6FsLzA2A3Nj9CYw';

// Initialize Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth utility functions
const Auth = {
    // Get current user
    getCurrentUser: async () => {
        const { data: { user } } = await supabaseClient.auth.getUser();
        return user;
    },

    // Sign in with email and password
    signIn: async (email, password) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },

    // Sign up with email and password
    signUp: async (email, password, metadata = {}) => {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });
        return { data, error };
    },

    // Sign out
    signOut: async () => {
        const { error } = await supabaseClient.auth.signOut();
        return { error };
    },

    // Check if user is authenticated
    isAuthenticated: async () => {
        const { data: { session } } = await supabaseClient.auth.getSession();
        return !!session;
    },

    // Get user session
    getSession: async () => {
        const { data: { session } } = await supabaseClient.auth.getSession();
        return session;
    }
};

// Database utility functions
const Database = {
    // Get bookings for current user
    getBookings: async (userId) => {
        const { data, error } = await supabaseClient
            .from('bookings')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Add new booking
    addBooking: async (bookingData) => {
        const user = await Auth.getCurrentUser();
        if (!user) {
            return { data: null, error: { message: 'User not authenticated' } };
        }

        // Map the form data to correct database column names
        const mappedBookingData = {
            user_id: user.id,
            customer_name: bookingData.customer_name,
            phone_number: bookingData.phone_number,
            email: bookingData.email,
            check_in_date: bookingData.check_in_date,
            check_out_date: bookingData.check_out_date,
            number_of_nights: bookingData.number_of_nights,
            number_of_guests: bookingData.number_of_guests,
            price_per_night: bookingData.price_per_night,
            total_amount: bookingData.total_amount,
            paid_amount: bookingData.amount_paid, // Map amount_paid to paid_amount
            remaining_balance: bookingData.remaining_balance,
            payment_method: bookingData.payment_method,
            payment_status: bookingData.payment_status,
            special_requests: bookingData.special_requests,
            notes: bookingData.notes
        };

        const { data, error } = await supabaseClient
            .from('bookings')
            .insert([mappedBookingData])
            .select();
        return { data, error };
    },

    // Update booking
    updateBooking: async (bookingId, updates) => {
        const user = await Auth.getCurrentUser();
        if (!user) {
            return { data: null, error: { message: 'User not authenticated' } };
        }

        // Map any amount_paid field to paid_amount
        const mappedUpdates = { ...updates };
        if (mappedUpdates.amount_paid !== undefined) {
            mappedUpdates.paid_amount = mappedUpdates.amount_paid;
            delete mappedUpdates.amount_paid;
        }

        const { data, error } = await supabaseClient
            .from('bookings')
            .update(mappedUpdates)
            .eq('id', bookingId)
            .eq('user_id', user.id)
            .select();
        return { data, error };
    },

    // Delete booking
    deleteBooking: async (bookingId) => {
        const user = await Auth.getCurrentUser();
        if (!user) {
            return { data: null, error: { message: 'User not authenticated' } };
        }

        const { data, error } = await supabaseClient
            .from('bookings')
            .delete()
            .eq('id', bookingId)
            .eq('user_id', user.id);
        return { data, error };
    }
};

// Helper functions
const Utils = {
    // Redirect to login if not authenticated
    requireAuth: async () => {
        const isAuth = await Auth.isAuthenticated();
        if (!isAuth) {
            window.location.href = 'login_authentication.html';
            return false;
        }
        return true;
    },

    // Handle authentication errors
    handleAuthError: (error) => {
        console.error('Authentication error:', error);
        if (error.message.includes('Invalid login credentials')) {
            return 'اسم المستخدم أو كلمة المرور غير صحيحة';
        } else if (error.message.includes('Email not confirmed')) {
            return 'يرجى تأكيد البريد الإلكتروني أولاً';
        } else if (error.message.includes('Too many requests')) {
            return 'محاولات كثيرة. يرجى المحاولة لاحقاً';
        }
        return error.message || 'حدث خطأ غير متوقع';
    },

    // Handle database errors
    handleDatabaseError: (error) => {
        console.error('Database error:', error);
        if (error.message.includes('permission denied')) {
            return 'ليس لديك صلاحية للوصول إلى هذه البيانات';
        } else if (error.message.includes('connection')) {
            return 'خطأ في الاتصال بقاعدة البيانات';
        }
        return error.message || 'حدث خطأ في قاعدة البيانات';
    },

    // Format user display name
    formatUserName: (user) => {
        if (user.user_metadata?.full_name) {
            return user.user_metadata.full_name;
        } else if (user.user_metadata?.first_name) {
            return user.user_metadata.first_name;
        } else {
            return user.email.split('@')[0];
        }
    }
};

// Export for use in other files
window.supabaseClient = supabaseClient;
window.Auth = Auth;
window.Database = Database;
window.Utils = Utils;
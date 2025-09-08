import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create admin client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    console.log('Creating default user...')

    // Default user credentials
    const defaultEmail = 'admin@nfcom.com'
    const defaultPassword = 'nfcom123'

    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers()
    
    if (listError) {
      console.error('Error listing users:', listError)
      throw listError
    }

    const userExists = existingUsers.users.find(user => user.email === defaultEmail)
    
    if (userExists) {
      console.log('Default user already exists')
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Usuário padrão já existe',
          email: defaultEmail 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // Create the default user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: defaultEmail,
      password: defaultPassword,
      email_confirm: true // Skip email confirmation
    })

    if (createError) {
      console.error('Error creating user:', createError)
      throw createError
    }

    console.log('Default user created successfully:', newUser.user.email)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Usuário padrão criado com sucesso',
        email: defaultEmail,
        password: defaultPassword,
        user_id: newUser.user.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in create-default-user function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://pmwutxlnihrvjlcruwaw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtd3V0eGxuaWhydmpsY3J1d2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwNzAyNDYsImV4cCI6MTk5MjY0NjI0Nn0.qOCFhKW3SRuQAOOlzbQ3TbcbUEPatm5U1u36illuhBQ"
);

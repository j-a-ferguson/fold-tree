// single fold
// {{{ fold with comment

// }}}
// This is a 
// text node
// here
// nested folds
// {{{


    // {{{
        
    // }}}

    // {{{

        // {{{

        // }}}

    // }}}

// }}}

// same line fold
// {{{ // }}}

int fcn(double val)
{
    int a = 1;
    int b = 2;
    {
        double d = 1.0;
    }
    return a;
}
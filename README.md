# Fold Tree

This is a simple typescript library for parsing documents with a VIM-style
folded-code structure. It is the back-end of a VScode extension I am writing to 
provide VIM-style folding but also some IDE-like features to quickly navigate 
through files with folded structure. Specifically, we would like to provide the underlying functionality to enable:

- Fast query of folding ranges
- Fast insertion of a new fold
- Fast deletion of an existing fold

To solve for these properties I took a compiler-like appreach whereby I specify a BNF grammar for what I shall call **foldlang** and will construct an abstract syntax tree representing a file. Once this has been constructed the operations above may be implemented as standard $N$-tree operations

## The VIM Fold

A fold in VIM, and any text editor for that matter, is a range of lines in a text file which may be 
hidden, or folded. They can be useful for hiding detail when it is not needed and expanding detail only
where it is wanted.
Folds in VIM are started with a ``{{{`` and finished with a ``}}}``. Obviously, when used in a 
programming language they need to be prepended with a line comment token. For the moment we will use the
C-style line comment ``//``. An example of a VIM fold would be:
```
//{{{
Some text
///}}}
```

Folds can be nested:

```
//{{{
This is the outer fold
    //{{{
    This is the inner fold
    //}}}
//}}}
```
You can also have an arbitrary number of them on the same level:
```
\\{{{
fold 1
\\}}}
\\{{{
fold 2
\\}}}
\\{{{
fold 3
\\}}}
```
Additionally, the special cases where a file has not folds or is empty must also be handled gracefully.

## The Foldlang Grammar

The first step in writing a parser for any language is to specify its grammar. 
In this grammar we denote terminals in all capitals and non-terminals in lower case. and we have eschewed some of the more complex constructs (such as regex-style quantifiers such as "\*" and "+" optional groups using "|") and have laid each production out explicitly. Therefore, the grammar for the fold structure is given by:
```ebnf 
file          ::= ffile $                                 P1
ffile         ::= fold ffile                              P2
ffile         ::= fold                                    P3
fold          ::= OPENBRACK ffile CLOSEBRACK              P4
fold          ::= text fold                               P5
fold          ::= text                                    P6 
text          ::= TEXTLINE text                           P7
text          ::= TEXTLINE                                P8
text          ::= epsilon                                 P9
```
Each production is labelled with a $P_{i}$. The erminals have the following regex forms:
```ebnf
OPENBRACK  ::= "^\s*//{{{.*$"
CLOSEBRACK ::= "^\s*//}}}$"
TEXTLINE   ::= Any line which is not one of those above
```

Lexing, the process by which we take a text file and turn it into a stream of tokens, is greatly 
simplified in **foldlang** as each token resides on its own line.
Let's look at some examples of each of these productions to get a feel for what they mean, starting 
with ``P9``. 


### Mathemtical Treatment
To formalise some of the coming discussion, I shall give a more mathematical treatment by using the following notation for non-terminals:

|Code form|Math form|
|----------|----------|
| ``file`` | $A$ |
|``ffile``|$A^{'}$|
|``fold``|$B$|
|``text``| $C$ |

Therefore, the set of non-terminals is denoted: $S_{NT} =  \set{A^{'}, A, B,C}$.  The set of terminals shall be denoted with lower-case bold symbols

|Code form|Math form|
|-----------|-----------|
| ``OPENBBRACK`` | $\mathbf{ob}$ |
| ``CLOSEBRACK`` |  $\mathbf{cb}$ |
|``TEXTLINE``    |  $\mathbf{te}$ |
| ``epsilon``        |  $\epsilon$ |

and denote the set of terminals as $S_{T} = \set{\mathbf{ob}, \mathbf{cb}, \mathbf{te}}$. The mathematical form of the grammar is therefore given by:

$$\begin{align}
	A & \rightarrow A^{'} \;\$ & (P_{1}) \\
	A^{'} & \rightarrow B \; A^{'} & (P_{2}) \\
	A^{'} & \rightarrow B & (P_{3}) \\
	B & \rightarrow \mathbf{ob} \; A^{'} \; \mathbf{cb} & (P_{4}) \\
	B & \rightarrow C \; B & (P_{5})\\
	B & \rightarrow C & (P_{6})  \\
	C & \rightarrow \mathbf{te} \; C  & (P_{7})\\
	C & \rightarrow \mathbf{te} & (P_{8})\\
	C & \rightarrow \epsilon & (P_{9})
\end{align}$$

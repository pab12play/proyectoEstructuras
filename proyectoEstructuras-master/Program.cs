using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace RSA
{
    public class Startup
    {
        public async Task<object> Invoke(dynamic input)
        {
            string uno = (string)input.uno;
            string dos = (string)input.dos;
            string tres = (string)input.tres;
            string[] args = new string[] {uno,dos,tres};
                if (args.Length == 1 && args[0].ToLower().Equals("help"))
                {
                    Console.WriteLine("Hola");
                    Console.WriteLine("Uso: .\\RSA.exe [-d] [-c] [-f <archivo>]");
                    Console.WriteLine("");
                    Console.WriteLine("\t-d\tDescifra un archivo");
                    Console.WriteLine("\t-c\tCifra un archivo");
                    Console.WriteLine("\t-f\tEspecifica la ruta y nombre del archivo");
                }
            else if (args.Length == 3)
            {
                switch (args[0].ToLower())  
                {
                    case "-d":
                        if (args[1].ToLower().Equals("-f"))
                        {
                            return Program.decifrar(args[2]);
                        }
                        else
                        {
                            Console.WriteLine("Por favor ingrese una opción correcta. Consulte la opción 'help' para ayuda");
                        }
                        break;
                    case "-c":
                        if (args[1].ToLower().Equals("-f"))
                        {
                            return Program.cifrar(args[2]);
                        }
                        else
                        {
                            Console.WriteLine("Por favor ingrese una opción correcta. Consulte la opción 'help' para ayuda");
                        }
                        break;
                    default:
                        Console.WriteLine("Por favor ingrese una opción correcta. Consulte la opción 'help' para ayuda");
                        break;
                }
            }
            else
            {
                Console.WriteLine("Por favor ingrese una opción correcta. Consulte la opción 'help' para ayuda");
            }
            return "Error";
        }
    }

    public class Program
    {

        static void Main(string[] args)
        {
            //args = new string[] { "-c","-f","h" };
            //args = new string[] { "-d", "-f", "pgUAAA==" };
            if (args.Length == 1 && args[0].ToLower().Equals("help"))
            {
                Console.WriteLine("Hola");
                Console.WriteLine("Uso: .\\RSA.exe [-d] [-c] [-f <archivo>]");
                Console.WriteLine("");
                Console.WriteLine("\t-d\tDescifra un archivo");
                Console.WriteLine("\t-c\tCifra un archivo");
                Console.WriteLine("\t-f\tEspecifica la ruta y nombre del archivo");
            }
            else if (args.Length == 3)
            {
                switch (args[0].ToLower())
                {
                    case "-d":
                        if (args[1].ToLower().Equals("-f"))
                        {
                            Console.WriteLine(decifrar(args[2]));
                        }
                        else
                        {
                            Console.WriteLine("Por favor ingrese una opción correcta. Consulte la opción 'help' para ayuda");
                        }
                        break;
                    case "-c":
                        if (args[1].ToLower().Equals("-f"))
                        {
                            Console.WriteLine(cifrar(args[2]));
                        }
                        else
                        {
                            Console.WriteLine("Por favor ingrese una opción correcta. Consulte la opción 'help' para ayuda");
                        }
                        break;
                    default:
                        Console.WriteLine("Por favor ingrese una opción correcta. Consulte la opción 'help' para ayuda");
                        break;
                }
            }
            else
            {
                Console.WriteLine("Por favor ingrese una opción correcta. Consulte la opción 'help' para ayuda");
            }
        }

        public static string cifrar(string file)
        {
            Random rnd = new Random();
            int primo1 = 41;
            int primo2 = 73;
            while (primo1 == primo2)
            {
                primo2 = generatePrime(rnd.Next(10, 100));
            }
            PublicKey publicKey = new PublicKey(primo1, primo2);
            PrivateKey privateKey = new PrivateKey(publicKey.Phi, publicKey.E, publicKey.N);
            byte[] text = ASCIIEncoding.ASCII.GetBytes(file);
            List <byte> message = new List<byte>();
            foreach (byte b in text)
            {
                double letra = Math.Pow(b, publicKey.E) % publicKey.N;
                byte[] intBytes = BitConverter.GetBytes((int)letra);
                if (!BitConverter.IsLittleEndian)
                    Array.Reverse(intBytes);
                message.AddRange(intBytes);
            }
            string llavePublica = publicKey.E + "\n" + publicKey.N;
            string llavePrivada = privateKey.D + "\n" + privateKey.N;
            File.WriteAllText("llavePublica.key", llavePublica);
            File.WriteAllText("llavePrivada.key", llavePrivada);
            return Base64Encode(message.ToArray());
        }

        public static string decifrar(string file)
        {
            string[] llavePrivada = File.ReadLines("llavePrivada.Key").ToArray();
            PrivateKey privateKey = new PrivateKey(int.Parse(llavePrivada[1]), int.Parse(llavePrivada[0]));
            byte[] text = Base64Decode(file);
            string message = "";
            List<byte> temp = new List<byte>();
            int contador = 0;
            foreach (byte b in text)
            {
                if (contador >= 4)
                {
                    BigInteger decrypt = BigInteger.Pow(BitConverter.ToInt32(temp.ToArray(),0), privateKey.D) % privateKey.N;
                    message = message + (char)decrypt;
                    temp.Clear();
                    temp.Add(b);
                    contador = 1;
                }
                else
                {
                    temp.Add(b);
                    contador++;
                }
            }
            BigInteger decrypt1 = BigInteger.Pow(BitConverter.ToInt32(temp.ToArray(), 0), privateKey.D) % privateKey.N;
            message = message + (char)decrypt1;
            return message;
        }

        static int generatePrime(int number)
        {
            while (!isPrime(number))
            {
                number = number+1;
            } 
            return number;
        }

        static bool isPrime(int candidate)
        {
            if ((candidate & 1) == 0)
            {
                if (candidate == 2)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            for (int i = 3; (i * i) <= candidate; i += 2)
            {
                if ((candidate % i) == 0)
                {
                    return false;
                }
            }
            return candidate != 1;
        }

        public static string Base64Encode(byte[] plainText)
        {
            return System.Convert.ToBase64String(plainText);
        }

        public static byte[] Base64Decode(string base64EncodedData)
        {
            return System.Convert.FromBase64String(base64EncodedData);
        }
    }
}

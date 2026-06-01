Introducción
En la actualidad, la administración eficiente de centros educativos requiere herramientas tecnológicas que optimicen sus procesos internos y mejoren la experiencia del usuario. El presente proyecto consiste en el desarrollo de un sistema web para la gestión integral de una academia de música. Esta plataforma está diseñada para administrar la inscripción de alumnos en diversas disciplinas (canto y distintos instrumentos), ofreciendo un modelo de aprendizaje altamente personalizable.
El sistema destacará por su capacidad de manejar planes de estudio flexibles, permitiendo a los estudiantes distribuir sus horas semanales de clase según su conveniencia. Además, la plataforma centralizará la asignación de recursos fundamentales, automatizando el emparejamiento de los horarios de los alumnos con la disponibilidad de los profesores y gestionando el inventario de instrumentos para aquellos estudiantes que requieran un préstamo durante sus sesiones.
Planteamiento del Problema
Las academias de música tradicionales suelen enfrentar serias dificultades logísticas al intentar ofrecer horarios flexibles a sus estudiantes. Cuando un alumno tiene la libertad de fragmentar sus horas de clase semanales (por ejemplo, tomar tres horas en un solo día o dividirlas en tres días distintos), el registro manual o mediante hojas de cálculo se vuelve ineficiente y propenso a errores humanos.
Este modelo de negocio genera una triple restricción de disponibilidad: para agendar una clase con éxito, deben coincidir de forma simultánea (1) el horario del alumno, (2) el horario libre del profesor adecuado y (3) la disponibilidad física del instrumento en caso de que el alumno no posea uno propio. Sin un sistema automatizado, realizar este cruce de variables de forma manual genera cuellos de botella en la administración, sobreasignación de recursos (como prestar el mismo instrumento a dos alumnos a la vez) y choques de horarios entre profesores, lo que impacta negativamente en la calidad del servicio y limita la capacidad de crecimiento de la academia.
Objetivo Principal
Desarrollar una aplicación web para la gestión administrativa y académica de una academia de música, que automatice el proceso de inscripción, la distribución flexible de horarios y la asignación simultánea de profesores e instrumentos, optimizando el uso de los recursos y mejorando la experiencia de los estudiantes.
Objetivos Secundarios
1. Desarrollar un módulo de inscripción y planes: Crear una interfaz donde los alumnos puedan registrarse, seleccionar su disciplina (instrumento o canto) y elegir entre diferentes planes de suscripción basados en la cantidad de horas semanales y la modalidad de la clase (ej. individual).
2. Implementar un motor de agendamiento dinámico: Construir una herramienta de calendario interactivo que permita al alumno fraccionar y distribuir sus horas contratadas en los días y bloques de tiempo de su preferencia, validando la disponibilidad en tiempo real.
3. Gestionar el inventario de instrumentos: Desarrollar un submódulo que registre los instrumentos propiedad de la academia y controle su estado de préstamo, asegurando que un instrumento esté disponible en el horario exacto en que un alumno lo solicite.
4. Administrar perfiles y disponibilidad de profesores: Crear un registro de docentes que incluya sus especialidades (qué instrumentos enseñan) y sus bloques de horarios laborales, para que el sistema asigne automáticamente al profesor correcto según la elección del alumno.
5. Programar algoritmos de validación de conflictos: Implementar la lógica de negocio en el servidor que impida la creación de una clase si no existe coincidencia exacta entre el horario del alumno, el profesor y el instrumento, evitando la sobreposición de reservas (double-booking).
Alcance del Proyecto
Funcionalidades Incluidas
El sistema abarca la gestión integral de los procesos administrativos y académicos de la academia, organizados en los siguientes bloques:
Gestión de usuarios y accesos: Control de autenticación por roles (Administrador, Directora, Secretaria, Profesor), administración de cuentas y registro de auditoría de acciones críticas.
Gestión de personas: Registro y seguimiento de alumnos, padres/tutores y profesores, incluyendo estados activo/inactivo y sus relaciones dentro del sistema.
Gestión académica: Inscripciones con asignación de instrumento, horario, profesor y plan de pago, validando en tiempo real la disponibilidad de recursos y detectando conflictos de horario.
Gestión de recursos: Control de inventario de instrumentos de la academia, seguimiento de préstamos por sesión y liberación automática al cancelar o finalizar una inscripción.
Gestión de pagos y recibos: Registro automático de pagos por período, alertas de vencimiento, modificación de estados y generación de recibos con numeración secuencial.
Calendario: Vista de clases programadas filtrable por alumno, profesor, instrumento y día, accesible para todos los roles del sistema.
Funcionalidades Excluidas
Dashboard con estadísticas e indicadores: El sistema no incluirá un panel de métricas operativas (alumnos activos, ocupación de profesores, instrumentos más solicitados, etc.). Su desarrollo requeriría una capa adicional de análisis de datos y visualización que excede el alcance definido para esta etapa, cuya prioridad es la automatización de procesos administrativos.
Módulo financiero y estadísticas económicas: No se contempla la generación de reportes de ingresos, balances, proyecciones de cobranza ni ningún análisis económico. El sistema registra pagos individuales como soporte operativo, pero no está diseñado para funcionar como herramienta contable o financiera; esa función corresponde a un sistema especializado externo.
Portal de acceso para alumnos y padres: Los alumnos y padres/tutores no tendrán acceso al sistema bajo ninguna circunstancia, por lo que quedan excluidas funcionalidades como consulta de horarios propios, pagos en línea o comunicación directa a través de la plataforma.
Requerimientos Funcionales
RF-01 · Gestión de Usuarios y Autenticación
RF-01.1 El sistema debe permitir el inicio de sesión con usuario y contraseña según el rol (Administrador, Directora, Secretaria, Profesor), controlando el acceso a los módulos según los permisos correspondientes y permitiendo el cierre de sesión seguro desde cualquier punto de la aplicación.
RF-01.2 El Administrador puede crear, editar, activar y desactivar cuentas de usuarios internos, y el sistema debe registrar un log de accesos y acciones críticas indicando quién realizó cada acción y cuándo.
RF-02 · Gestión de Alumnos
RF-02.1 La Secretaria, Directora y Administrador pueden registrar, modificar, buscar y dar de baja alumnos (estado inactivo) sin eliminar su historial, pudiendo asociar uno o más padres/tutores nuevos o existentes en cualquier momento.
RF-02.2 Los alumnos no tendrán acceso al sistema bajo ninguna circunstancia.
RF-03 · Gestión de Padres / Tutores
RF-03.1 La Secretaria, Directora y Administrador pueden registrar y modificar padres/tutores con sus datos personales y relación con el alumno, permitiendo que un mismo padre/tutor esté asociado a más de un alumno.
RF-04 · Gestión de Instrumentos
RF-04.1 El Administrador y la Directora pueden registrar y gestionar el stock de instrumentos (agregar, dar de baja, modificar estado), mientras que todos los roles pueden consultar su disponibilidad por día y hora.
RF-04.2 Al registrar una inscripción, el sistema debe verificar la disponibilidad del instrumento en el horario asignado, registrar el préstamo o indicar instrumento propio, y liberar automáticamente el instrumento al finalizar o cancelar la inscripción.
RF-05 · Gestión de Horarios
RF-05.1 El Administrador y la Directora pueden definir y modificar los rangos de horario permitidos por día, y la Secretaria, Directora y Administrador pueden asignar horarios a los alumnos dentro de esos rangos.
RF-05.2 El sistema debe validar que el horario seleccionado no exceda los límites definidos y detectar conflictos de horario para el mismo profesor o instrumento prestado.
RF-06 · Gestión de Planes y Descuentos
RF-06.1 El Administrador y la Directora pueden crear, editar y desactivar planes de pago y descuentos, especificando sus condiciones y criterios de aplicación.
RF-06.2 La Secretaria solo puede seleccionar planes y descuentos activos ya existentes al registrar o renovar una inscripción, sin poder crearlos ni modificarlos.
RF-07 · Gestión de Inscripciones / Clases
RF-07.1 La Secretaria, Directora y Administrador pueden registrar y modificar inscripciones de alumnos, seleccionando instrumento, horario, días, plan, descuento y profesor asignado, verificando que no existan conflictos de horario para el profesor.
RF-07.2 El sistema debe calcular automáticamente el monto a pagar según el plan y descuento seleccionados, e impedir la inscripción si el instrumento prestado no está disponible en el horario elegido.
RF-08 · Gestión de Pagos
RF-08.1 El sistema debe registrar automáticamente los pagos al completar la inscripción, generar nuevos registros al vencer cada período y enviar alertas internas ante pagos próximos a vencer o ya vencidos.
RF-08.2 La Secretaria, Directora y Administrador pueden modificar el estado y los datos de un pago, con acceso al historial según su rol, sin poder eliminar registros históricos.
RF-09 · Generación de Recibos
RF-09.1 Al registrar un pago como "Pagado", el sistema debe permitir generar, imprimir y reimprimir un recibo con número de comprobante único y secuencial, incluyendo los datos del alumno, plan, período, montos y responsable del registro.
RF-10 · Calendario y Vista de Clases
RF-10.1 El sistema debe mostrar un calendario con las clases programadas, filtrable por profesor, instrumento, día o alumno, accesible para todos los roles con acceso al sistema.
RF-10.2 El Profesor puede consultar el listado de sus alumnos asignados con el detalle de horario e instrumento de cada uno.
RF-11 · Gestión de Profesores
RF-11.1 El Administrador y la Directora pueden registrar, modificar y desactivar perfiles de profesores, y el sistema debe impedir asignar un profesor inactivo a una nueva clase.
Requerimientos No Funcionales
RNF-01 · Seguridad
RNF-01.1 Las contraseñas deben almacenarse con hash seguro (bcrypt), la comunicación debe realizarse por HTTPS y la autenticación mediante JWT con tiempo de expiración configurable.
RNF-01.2 El backend debe validar permisos por rol en cada endpoint y el sistema debe protegerse contra ataques comunes (SQL Injection, XSS, CSRF), tratando los datos sensibles conforme a la normativa de protección de datos aplicable.
RNF-02 · Rendimiento
RNF-02.1 Las páginas y listados principales deben cargar en menos de 3 segundos, soportando al menos 20 usuarios concurrentes y contando con índices adecuados en las columnas de búsqueda frecuente.
RNF-03 · Usabilidad
RNF-03.1 La interfaz debe ser intuitiva y responsiva, con mensajes de error claros y confirmación antes de ejecutar acciones irreversibles.
RNF-04 · Disponibilidad y Confiabilidad
RNF-04.1 El sistema debe tener una disponibilidad mínima del 99% en horario de operación, con backups semanales de la base de datos y manejo elegante de errores sin exponer información técnica al usuario.
RNF-05 · Mantenibilidad
RNF-05.1 El backend debe seguir una arquitectura en capas (Controladores, Servicios, Repositorios), con migraciones versionadas para la base de datos y código comentado con convenciones de nomenclatura consistentes.
RNF-05.2 El frontend debe organizarse en componentes reutilizables con un estado global manejable (Context API o Redux).
RNF-06 · Escalabilidad
RNF-06.1 La arquitectura y el diseño de la base de datos deben permitir agregar nuevos módulos, roles o volumen de datos sin reestructuraciones mayores.








Modelo de Base de Datos
 
